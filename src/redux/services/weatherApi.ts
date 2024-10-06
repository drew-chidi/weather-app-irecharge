import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_WEATHERSTACK_URL;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getCurrentWeatherByCity: builder.query({
      query: (city) => `/current?access_key=${accessKey}&query=${city}`,
    }),
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }) =>
        `/current?access_key=${accessKey}&query=${lat},${lon}`,
    }),
  }),
});

export const { useGetCurrentWeatherByCityQuery, useGetWeatherByCoordsQuery } =
  weatherApi;
