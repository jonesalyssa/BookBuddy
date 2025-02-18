import { createSlice } from "@reduxjs/toolkit";
import api from "../data/api";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "books",
      providesTags: ["Books"],
      transformResponse: (response) => response?.books || [],
    }),
    getBook: build.query({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    checkoutBook: build.mutation({
      query: (bookId) => ({
        url: `books/checkout/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useDeleteBookMutation,
  useCheckoutBookMutation,
} = bookApi;

const initialState = {
  books: [],
  selectedBookId: null,
  cart: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBookId: (state, action) => {
      state.selectedBookId = action.payload;
    },
    addToCart: (state, action) => {
      const book = action.payload;
      if (!state.cart.some((item) => item.id === book.id)) {
        state.cart.push(book);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((book) => book.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setSelectedBookId, addToCart, removeFromCart, clearCart } =
  bookSlice.actions;

export default bookSlice.reducer;
export { bookApi };
