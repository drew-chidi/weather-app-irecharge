import { useState, useEffect } from 'react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

const weatherApiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
const apiKey = import.meta.env.VITE_ACCESS_KEY;

const baseQuery = fetchBaseQuery({ baseUrl: weatherApiUrl });

export const useWeatherData = (cities: string[]) => {
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});

  // Function to fetch weather data manually
  const fetchWeatherForCity = async (city: string) => {
    try {
      const response = await baseQuery(
        `/current?access_key=${apiKey}&query=${city}`
      );

      console.log({ response });

      if (response.error) {
        throw new Error(
          response.error.data?.error?.message || 'Error fetching weather'
        );
      }

      const transformedData = transformWeatherData(response.data);
      setWeatherData((prev) => ({ ...prev, [city]: transformedData }));
    } catch (error) {
      toast.error(`Failed to fetch weather for ${city}: ${error.message}`);
    }
  };

  useEffect(() => {
    cities.forEach((city) => {
      fetchWeatherForCity(city);
    });
  }, [cities]);

  const transformWeatherData = (data: any) => {
    return {
      temperature: data?.current?.temp_c,
      condition: data?.current?.condition?.text,
      icon: data?.current?.condition?.icon,
    };
  };

  return weatherData;
};
