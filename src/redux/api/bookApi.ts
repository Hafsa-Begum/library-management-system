import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["book", "single-book"],
  endpoints: (builder) => ({

    getAllBook:builder.query({
        query:()=>"/api/books",
        providesTags:["book"]
    }),
    getSingleBook:builder.query({
        query:(bookId)=>`/api/books/${bookId}`,
        providesTags:["single-book"]
    }),
    addBook: builder.mutation({
      query: (body) => ({
        url: "/api/books",
        method: "POST",
        body,
      }),
      // invalidatesTags:["book"]
    }),
    updateBook: builder.mutation({
      query: ({id, body}) => ({
        url: `/api/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags:["book"]
    }),
    deleteBook: builder.mutation({
      query: (id:string) => ({
        url: `/api/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags:["book"]
    }),
  }),
});

export const {
  useGetAllBookQuery, 
  useGetSingleBookQuery, 
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
}=bookApi;