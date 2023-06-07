import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {import("../../../types/posts").Post} Post
 */

/**
 * @typedef {'None' | 'Loading' | 'Some' | 'Error'} PostTag
 * @typedef {{ tag: PostTag }} TaggedPost
 * @typedef {{ tag: 'None' }} None
 * @typedef {{ tag: 'Loading' }} Loading
 * @typedef {{ tag: 'Some', post: Post }} Some
 * @typedef {{ tag: 'Error', error: any }} Error
 * @typedef {TaggedPost & (None | Loading | Some | Error)} PostState
 */

/**
 * @returns {PostState}
 */
const initialState = () => ({ tag: "None" });

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		clear: (_) => ({ tag: "None" }),
		loading: (_) => ({ tag: "Loading" }),
		/**
		 * @param {{ payload: Post }} action
		 */
		set: (_, action) => ({ tag: "Some", post: action.payload }),
		/**
		 * @param {{ payload: any }} action
		 */
		error: (_, action) => ({ tag: "Error", error: action.payload }),
	},
});

export const { clear, loading, set, error } = postSlice.actions;

export default postSlice.reducer;
