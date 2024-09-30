import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
// import { toast } from 'sonner';

// const toastError = (errors: any) => {
//   const errorKeys = Object.keys(errors);
//   if (Array.isArray(errors[errorKeys[0]])) {
//     const message = errors[errorKeys[0]][0];
//     toast.error(message);
//     return;
//   } else {
//     const message = errors[errorKeys[0]];
//     toast.error(message);
//   }
// };

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result);

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: [],
});
