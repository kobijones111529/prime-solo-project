import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (_, { payload: user }) => user,
    unset: () => null
  }
});

export const { set, unset } = userSlice.actions;

export default userSlice.reducer;
