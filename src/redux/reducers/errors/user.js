import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    clear: () => null,
    unauthenticated: () => 'unauthenticated',
    unspecified: () => 'unspecified'
  }
});

export const {
  clear,
  unauthenticated,
  unspecified
} = userSlice.actions;

export default userSlice.reducer;
