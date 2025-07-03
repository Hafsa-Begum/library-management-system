import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({

    getAllBook:builder.query({
        query:()=>"/api/books",
        providesTags:["book"]
    })
  }),
});

export const {useGetAllBookQuery}=bookApi;