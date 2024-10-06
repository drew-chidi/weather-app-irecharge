// src/services/geonamesApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geonamesApi = createApi({
  reducerPath: 'geonamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.geonames.org/' }),
  endpoints: (builder) => ({
    searchCity: builder.query({
      query: ({ cityName, maxRows = 10 }) =>
        `searchJSON?q=${cityName}&maxRows=${maxRows}&username=YOUR_USERNAME`,
    }),
    getCityByLatLng: builder.query({
      query: ({ lat, lng }) =>
        `findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=YOUR_USERNAME`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useSearchCityQuery, useGetCityByLatLngQuery } = geonamesApi;
