import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ListWeatherData } from '@/types/weather.type';

const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

const useTopCitiesWeatherData = (cities: string[]) => {
  const [weatherData, setWeatherData] = useState<ListWeatherData[]>(() => {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataSequentially = async () => {
      setLoading(true);

      for (const city of cities) {
        if (
          weatherData.some(
            (item) => item.city.toLowerCase() === city.toLowerCase()
          )
        ) {
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
            id: data.location.name,
            city: data.location.name,
            temperature: data.current.temperature,
            condition: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
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
    };

    if (cities.length > 0) {
      fetchDataSequentially();
    }
  }, [cities]);

  // Refresh function
  const refreshData = () => {
    localStorage.removeItem('weatherData');
    setWeatherData([]);
    cities.forEach((city) => {
      axios
        .get(`${apiUrl}/current`, {
          params: {
            access_key: accessKey,
            query: city,
          },
        })
        .then((response) => {
          const data = response.data;
          const transformedData: ListWeatherData = {
            id: data.location.name,
            city: data.location.name,
            temperature: data.current.temperature,
            condition: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
          };

          setWeatherData((prev) => {
            const updatedWeatherData = [...prev, transformedData];
            localStorage.setItem(
              'weatherData',
              JSON.stringify(updatedWeatherData)
            );
            return updatedWeatherData;
          });
        })
        .catch((error) => {
          toast.error(`Failed to refresh weather`);
          throw error;
        });
    });
  };

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
