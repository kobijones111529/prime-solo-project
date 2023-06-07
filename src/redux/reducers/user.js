import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {import("../../../types/user").User} User
 */

/**
 * @typedef {'None' | 'Loading' | 'Some' | 'Error'} UserTag
 * @typedef {{ tag: UserTag }} TaggedUser
 * @typedef {{ tag: 'None' }} None
 * @typedef {{ tag: 'Loading' }} Loading
 * @typedef {{ tag: 'Some', user: User }} Some
 * @typedef {{ tag: 'Error', error: any }} Error
 * @typedef {TaggedUser & (None | Loading | Some | Error)} UserState
 */

/** @type {() => UserState} */
const initialState = () => ({ tag: "None" });

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clear: (_) => ({ tag: "None" }),
		loading: (_) => ({ tag: "Loading" }),
		/**
		 * @param {{ payload: User }} action
		 */
		set: (_, action) => ({ tag: "Some", user: action.payload }),
		/**
		 * @param {{ payload: any }} action
		 */
		error: (_, action) => ({ tag: "Error", error: action.payload }),
	},
});

export const { clear, loading, set, error } = userSlice.actions;

export default userSlice.reducer;
