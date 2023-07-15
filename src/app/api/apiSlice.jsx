import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'foodieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://foodie-28dq.onrender.com' }),
  endpoints: builder => ({})
})


export const { useGetfoodieByNameQuery } = apiSlice