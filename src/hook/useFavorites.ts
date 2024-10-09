import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/citySlice';
import axios from 'axios';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';
import { ListWeatherData } from '@/types/weather.type';

/**
 * A custom hook for managing favorite cities and their weather data in the weather app.
 *
 * This hook handles fetching, adding, and removing favorite cities, while also caching weather data in local storage.
 * It ensures the favorites list and related weather data are persisted and can be refreshed on demand.
 *
 * @returns {{
 *   favoriteWeatherData: ListWeatherData[],      // The sorted array of weather data for favorite cities.
 *   loading: boolean,                            // The loading state for fetching weather data.
 *   error: string | null,                        // The error message, if any occurred during data fetching.
 *   refreshData: () => void,                     // Function to refresh weather data for favorite cities.
 *   addFavoriteCity: (city: string) => void,     // Function to add a city to the favorite list.
 *   removeFavoriteCity: (city: string) => void,  // Function to remove a city from the favorite list.
 * }}
 * @returns {ListWeatherData[]} favoriteWeatherData - The current weather data for favorite cities.
 * @returns {boolean} loading - Indicates if data is being fetched.
 * @returns {string | null} error - The error message if fetching fails.
 * @returns {() => void} refreshData - Refreshes weather data for favorite cities.
 * @returns {(city: string) => void} addFavoriteCity - Adds a city to the favorite list.
 * @returns {(city: string) => void} removeFavoriteCity - Removes a city from the favorite list.
 */

const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

const useFavorites = () => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(
    (state: RootState) => state.city.favorites
  );

  // Initialize as an array of objects
  const [favoriteWeatherData, setFavoriteWeatherData] = useState<
    ListWeatherData[]
  >(() => {
    const storedData = localStorage.getItem('favoriteWeatherData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data for favorite cities
  useEffect(() => {
    const fetchFavoriteWeatherData = async () => {
      setLoading(true);
      setError(null);

      for (const city of favoriteCities) {
        if (
          favoriteWeatherData.some(
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

          setFavoriteWeatherData((prev) => {
            const updatedData = [...prev, transformedData];
            localStorage.setItem(
              'favoriteWeatherData',
              JSON.stringify(updatedData)
            );
            return updatedData;
          });
        } catch (error) {
          setError(`${error}: Failed to fetch weather for ${city}`);
          toast.error(`Failed to fetch weather for ${city}`);
        }
      }

      setLoading(false);
    };

    if (favoriteCities?.length > 0) {
      fetchFavoriteWeatherData();
    } else {
      setFavoriteWeatherData([]);
      localStorage.setItem('favoriteWeatherData', JSON.stringify([]));
    }
  }, [favoriteCities]);

  const addFavoriteCity = (city: string) => {
    if (!favoriteCities.includes(city)) {
      dispatch(addFavorite(city));
    }
  };

  const removeFavoriteCity = (city: string) => {
    if (favoriteCities.includes(city)) {
      dispatch(removeFavorite(city));

      // Remove city from local state and localStorage
      setFavoriteWeatherData((prev) => {
        const updatedData = prev.filter((item) => item.city !== city);
        localStorage.setItem(
          'favoriteWeatherData',
          JSON.stringify(updatedData)
        );
        return updatedData;
      });
    }
  };

  // Refresh function
  const refreshData = () => {
    localStorage.removeItem('weatherData');
    setFavoriteWeatherData([]);
    favoriteCities.forEach((city) => {
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

          setFavoriteWeatherData((prev) => {
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

  // Sort favorite weather data alphabetically by city
  const sortedFavoriteWeatherData = [...favoriteWeatherData].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return {
    favoriteWeatherData: sortedFavoriteWeatherData,
    loading,
    error,
    refreshData,
    addFavoriteCity,
    removeFavoriteCity,
  };
};

export default useFavorites;
