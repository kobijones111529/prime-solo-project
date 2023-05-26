import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    clear: () => null,
    invalidInput: () => 'invalid_input',
    authenticationFailed: () => 'authentication_failed',
    unspecified: () => 'unspecified'
  }
});

export const {
  clear,
  invalidInput,
  authenticationFailed,
  unspecified
} = loginSlice.actions;

export default loginSlice.reducer;
