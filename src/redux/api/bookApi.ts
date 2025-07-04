import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({

    getAllBook:builder.query({
        query:()=>"/api/books",
        providesTags:["book"]
    }),
    getSingleBook:builder.query({
        query:(bookId)=>`/api/books/${bookId}`,
        providesTags:["single-book"]
    })
  }),
});

export const {useGetAllBookQuery, useGetSingleBookQuery}=bookApi;