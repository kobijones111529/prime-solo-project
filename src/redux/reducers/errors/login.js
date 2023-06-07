import { createSlice } from "@reduxjs/toolkit";

/**
 * @param {string} name
 */
const qualifiedName = (name) => `errors/${name}`;

/**
 * @returns {'invalid_input' | 'authentication_failed' | 'unspecified' | null}
 */
const initialState = () => null;

const loginSlice = createSlice({
	name: qualifiedName("login"),
	initialState,
	reducers: {
		clear: () => null,
		invalidInput: (_) => "invalid_input",
		authenticationFailed: (_) => "authentication_failed",
		unspecified: (_) => "unspecified",
	},
});

export const { clear, invalidInput, authenticationFailed, unspecified } =
	loginSlice.actions;

export default loginSlice.reducer;
