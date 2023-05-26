import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    set: (_, action) => {
      return [...action.payload]
    }
  }
});

export const { set } = postsSlice.actions;

export default postsSlice.reducer;
