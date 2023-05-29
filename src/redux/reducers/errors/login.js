import { createSlice } from "@reduxjs/toolkit";

/**
 * @param {string} name
 */
const qualifiedName = name => `errors/${name}`;

/**
 * @returns {string | null}
 */
const initialState = () => null;

const loginSlice = createSlice({
  name: qualifiedName('login'),
  initialState,
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
