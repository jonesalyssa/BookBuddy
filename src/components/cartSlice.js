import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const book = action.payload;
      const existingBook = state.items.find((item) => item.id === book.id);
      if (!existingBook) {
        state.items.push(book);
      } else {
        // for some reason I something on this line to keep it working even though I don't need "else" really
      }
    },
    removeFromCart: (state, action) => {
      const bookId = action.payload;
      state.items = state.items.filter((item) => item.id !== bookId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
