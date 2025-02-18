import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Books", "User"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getBook: builder.query({
      query: (bookId) => `books/${bookId}`,
      providesTags: (result, error, bookId) =>
        result ? [{ type: "Books", id: bookId }] : [],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `books/${bookId}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    checkoutBook: builder.mutation({
      query: (bookId) => ({
        url: `books/checkout/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Books", "User"],
    }),
    returnBook: builder.mutation({
      query: (bookId) => ({
        url: `books/return/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Books", "User"],
    }),

    getUser: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "users/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "users/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCheckoutBookMutation,
  useReturnBookMutation,
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = api;

export default api;
