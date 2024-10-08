import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const useFetchWeatherData = (cities: string[]) => {
  const [weatherData, setWeatherData] = useState<{
    [key: string]: WeatherData;
  }>(() => {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    const fetchDataSequentially = async () => {
      setLoading(true);
      setError(null);

      for (const city of cities) {
        if (weatherData[city]) {
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
            city: data.location.name,
            temperature: data.current.temperature,
            condition: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
          };

          console.log({ transformedData });

          setWeatherData((prev) => {
            const updatedWeatherData = {
              ...prev,
              [city]: transformedData,
            };
            localStorage.setItem(
              'weatherData',
              JSON.stringify(updatedWeatherData)
            );

            return updatedWeatherData;
          });
        } catch (error) {
          setError(`${error}: Failed to fetch weather for ${city}`);
          toast.error(`Failed to fetch weather for ${city}`);
        }
      }

      setLoading(false);
    };

    if (cities.length > 0) {
      fetchDataSequentially();
    }
  }, [cities]);

  const sortedWeatherData = Object.values(weatherData).sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return { weatherData: sortedWeatherData, loading, error };
};

export default useFetchWeatherData;
