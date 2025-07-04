import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["borrow"],
  endpoints: (builder) => ({

    getBorrowSummery:builder.query({
        query:()=>"/api/borrow",
        providesTags:["borrow"]
    })
  }),
});

export const {useGetBorrowSummeryQuery}=borrowApi;