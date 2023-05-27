import { createSlice } from "@reduxjs/toolkit";

const qualifiedName = name => `errors/${name}`;

const loginSlice = createSlice({
  name: qualifiedName('login'),
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
