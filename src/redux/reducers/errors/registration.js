import { createSlice } from "@reduxjs/toolkit";

/**
 * @param {string} name
 */
const qualifiedName = (name) => `errors/${name}`;

/**
 * @typedef {'invalid_input' | 'unspecified'} Error
 */

/**
 * @returns {Error | null}
 */
const initialState = () => null;

const registrationSlice = createSlice({
	name: qualifiedName("registration"),
	initialState,
	reducers: {
		clear: () => null,
		invalidInput: (_) => "invalid_input",
		unspecified: (_) => "unspecified",
	},
});

export const { clear, invalidInput, unspecified } = registrationSlice.actions;

export default registrationSlice.reducer;
