import { createSlice } from "@reduxjs/toolkit";

const qualifiedName = name => `errors/${name}`;

const registrationSlice = createSlice({
  name: qualifiedName('registration'),
  initialState: null,
  reducers: {
    clear: () => null,
    invalidInput: () => 'invalid_input',
    unspecified: () => 'unspecified'
  }
});

export const {
  clear,
  invalidInput,
  unspecified
} = registrationSlice.actions;

export default registrationSlice.reducer;
