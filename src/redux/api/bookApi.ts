import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({

    getAllBook:builder.query({
        query:()=>"/books",
        providesTags:["book"]
    })
  }),
});

export const {useGetAllBookQuery}=bookApi;