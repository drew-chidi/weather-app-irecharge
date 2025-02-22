import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ListWeatherData } from '@/types/weather.type';

/**
 * A custom hook for fetching and managing weather data for a list of top cities.
 *
 * This hook fetches weather data sequentially for a given list of cities, persists the data in local storage,
 * and provides functionality to refresh or remove cities from the list. It also ensures that the data is sorted alphabetically by city name.
 *
 * @param {string[]} cities - The array of city names for which weather data should be fetched.
 *
 * @returns {{
 *   weatherData: ListWeatherData[],              // The sorted array of weather data for top cities.
 *   loading: boolean,                            // The loading state for fetching weather data.
 *   refreshData: () => void,                     // Function to refresh weather data for all cities.
 *   removeCity: (city: string) => void,          // Function to remove a city from the weather data list.
 * }}
 * @returns {ListWeatherData[]} weatherData - The current weather data for the top cities.
 * @returns {boolean} loading - Indicates if data is being fetched.
 * @returns {() => void} refreshData - Refreshes weather data for all cities.
 * @returns {(city: string) => void} removeCity - Removes a city from the weather data list.
 */

const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

const normalizeCityName = (city: string) => city.toLowerCase().trim();

const useTopCitiesWeatherData = (cities: string[]) => {
  const [weatherData, setWeatherData] = useState<ListWeatherData[]>(() => {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const initialFetchRef = useRef(false);

  useEffect(() => {
    if (initialFetchRef.current) return;
    const fetchDataSequentially = async () => {
      setLoading(true);

      const fetchedCities = weatherData.map((item) =>
        normalizeCityName(item.city)
      );

      for (const city of cities) {
        const normalizedCity = normalizeCityName(city);

        if (fetchedCities?.includes(normalizedCity)) {
          continue;
        }

        try {
          const response = await axios.get(`${apiUrl}/current`, {
            params: {
              access_key: accessKey,
              query: city,
            },
          });

          const data = response.data;
          const transformedData: ListWeatherData = {
            id: normalizedCity,
            city: normalizedCity,
            temperature: data?.current?.temperature,
            condition: data?.current?.weather_descriptions[0],
            icon: data?.current?.weather_icons[0],
          };

          setWeatherData((prev) => {
            const updatedWeatherData = [...prev, transformedData];
            localStorage.setItem(
              'weatherData',
              JSON.stringify(updatedWeatherData)
            );
            return updatedWeatherData;
          });
        } catch (error) {
          toast.error(`${error}: Failed to fetch weather for ${city}`);
        }
      }

      setLoading(false);
      initialFetchRef.current = true;
    };

    if (cities?.length > 0 && !initialFetchRef.current) {
      fetchDataSequentially();
    }
  }, [cities]);

  // Refresh function
  const refreshData = () => {
    localStorage.removeItem('weatherData');
    setWeatherData([]);
    initialFetchRef.current = false;
  };

  // const refreshData = () => {
  //   localStorage.removeItem('weatherData');
  //   setWeatherData([]);
  //   cities.forEach((city) => {
  //     axios
  //       .get(`${apiUrl}/current`, {
  //         params: {
  //           access_key: accessKey,
  //           query: city,
  //         },
  //       })
  //       .then((response) => {
  //         const data = response.data;
  //         const transformedData: ListWeatherData = {
  //           id: data.location.name,
  //           city: data.location.name,
  //           temperature: data.current.temperature,
  //           condition: data.current.weather_descriptions[0],
  //           icon: data.current.weather_icons[0],
  //         };

  //         setWeatherData((prev) => {
  //           const updatedWeatherData = [...prev, transformedData];
  //           localStorage.setItem(
  //             'weatherData',
  //             JSON.stringify(updatedWeatherData)
  //           );
  //           return updatedWeatherData;
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error(`Failed to refresh weather ${error}`);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // };

  // Remove city function
  const removeCity = (city: string) => {
    setWeatherData((prev) => {
      const updatedCities = prev.filter((c) => c.id !== city);
      localStorage.setItem('weatherData', JSON.stringify(updatedCities));
      return updatedCities;
    });
  };

  const sortedWeatherData = [...weatherData].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return {
    weatherData: sortedWeatherData,
    loading,
    refreshData,
    removeCity,
  };
};

export default useTopCitiesWeatherData;
