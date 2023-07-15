import { apiSlice } from "../app/api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderSummary: builder.query({
      query: () => ({
        url: "/orders",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: ["OrderSummary"],
    }),
    createOrderSummary: builder.mutation({
      query: () => ({
        url: "/orders",
        method: "POST",
      }),
      invalidatesTags: ["OrderSummary", "CartItems"],
    }),
  }),
});

export const { useGetOrderSummaryQuery, useCreateOrderSummaryMutation } =
  orderApiSlice;
