import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        first: action.payload.first || "",
        last: action.payload.last || "",
        username: action.payload.username || "",
        email: action.payload.email || "",
        password: action.payload.password || "",
        checkedOutBooks: action.payload.checkedOutBooks || [],
      };
    },

    logout: (state) => {
      state.user = null;
    },

    checkoutBook: (state, action) => {
      state.user.checkedOutBooks.push(action.payload);
    },

    returnBook: (state, action) => {
      state.user.checkedOutBooks = state.user.checkedOutBooks.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const { setUser, logout, returnBook, checkoutBook } = userSlice.actions;

export default userSlice.reducer;
