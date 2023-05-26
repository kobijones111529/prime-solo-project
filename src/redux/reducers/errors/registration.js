import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: 'registration',
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
