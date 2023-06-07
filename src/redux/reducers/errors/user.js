import { createSlice } from "@reduxjs/toolkit";

/**
 * @param {string} name
 */
const qualifiedName = (name) => `errors/${name}`;

/**
 * @return {string | null}
 */
const initialState = () => null;

const userSlice = createSlice({
	name: qualifiedName("user"),
	initialState,
	reducers: {
		clear: () => null,
		unauthenticated: () => "unauthenticated",
		unspecified: () => "unspecified",
	},
});

export const { clear, unauthenticated, unspecified } = userSlice.actions;

export default userSlice.reducer;
