import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/citySlice';
import axios from 'axios';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';

export interface WeatherData {
  id: string;
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const useFavorites = () => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(
    (state: RootState) => state.city.favorites
  );

  // Initialize as an array of objects
  const [favoriteWeatherData, setFavoriteWeatherData] = useState<WeatherData[]>(
    () => {
      const storedData = localStorage.getItem('favoriteWeatherData');
      return storedData ? JSON.parse(storedData) : [];
    }
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

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
          const transformedData: WeatherData = {
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

  // Function to toggle favorite city
  const toggleFavorite = (city: string) => {
    const isFavorite = favoriteCities.includes(city);
    if (isFavorite) {
      dispatch(removeFavorite(city));

      // Remove city from local state and localStorage
      setFavoriteWeatherData((prev) => {
        const updatedData = prev.filter((item) => item.id !== city);
        localStorage.setItem(
          'favoriteWeatherData',
          JSON.stringify(updatedData)
        );
        return updatedData;
      });
    } else {
      dispatch(addFavorite(city));
    }
  };
  const addFavoriteCity = (city: string) => {
    if (!favoriteCities.includes(city)) {
      dispatch(addFavorite(city));
    }
  };

  const removeFavoriteCity = (city: string) => {
    console.log({
      city,
      favoriteCities,
      isIncluded: favoriteCities.includes(city),
    });
    if (favoriteCities.includes(city)) {
      dispatch(removeFavorite(city));

      // Remove city from local state and localStorage
      setFavoriteWeatherData((prev) => {
        console.log({ favoriteWeatherData });
        const updatedData = prev.filter((item) => item.city !== city);
        localStorage.setItem(
          'favoriteWeatherData',
          JSON.stringify(updatedData)
        );
        return updatedData;
      });
    }
  };

  console.log({ favoriteWeatherData, favoriteCities });

  // Sort favorite weather data alphabetically by city
  const sortedFavoriteWeatherData = [...favoriteWeatherData].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return {
    favoriteWeatherData: sortedFavoriteWeatherData,
    loading,
    error,
    toggleFavorite,
    addFavoriteCity,
    removeFavoriteCity,
  };
};

export default useFavorites;
