import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: 'post',
  initialState: null,
  reducers: {
    set: (_, { payload: post }) => post,
    unset: () => null
  }
});

export const {
  set,
  unset
} = postSlice.actions;

export default postSlice.reducer;
