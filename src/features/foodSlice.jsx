import { apiSlice } from "../app/api/apiSlice";

const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoods: builder.query({
      query: () => ({
        url: "/menu",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: ["MenuItems"],
    }),
    createFood: builder.mutation({
      query: (food) => ({
        url: "/menu",
        method: "POST",
        body: food,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateFood: builder.mutation({
      query: ({ id, food }) => ({
        url: `/menu/${id}`,
        method: "PATCH",
        body: food,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
    }),
  }),
});


export const {
  useGetAllFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = menuApiSlice;
