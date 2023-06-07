import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

/**
 * @template E
 * @typedef {import("./status").Status<E>} Status
 */

/**
 * @typedef {'not_found' | 'unauthenticated' | 'unauthorized' | 'unspecified'} DeleteError
 */

/**
 * @param {string} name
 */
const qualifiedName = (name) => `errors/post/${name}`;

/**
 * @returns {Map<number, Status<DeleteError>>}
 */
const initialState = () => new Map();

const deletePostSlice = createSlice({
	name: qualifiedName("delete"),
	initialState,
	reducers: {
		clearAll: () => new Map(),
		/**
		 * @param {{ payload: number }} action
		 */
		clear: (state, action) => {
			const newState = new Map(state);
			newState.delete(action.payload);
			return newState;
		},
		/**
		 * @param {{ payload: number }} action
		 */
		pending: (state, action) => {
			const newState = new Map(state);
			newState.set(action.payload, { tag: "pending" });
			return newState;
		},
		/**
		 * @param {{ payload: number }} action
		 */
		success: (state, action) => {
			const newState = new Map(state);
			newState.set(action.payload, { tag: "success" });
			return newState;
		},
		/**
		 * @param {{ payload: { id: number, error: DeleteError } }} action
		 */
		error: (state, action) => {
			const newState = new Map(state);
			newState.set(action.payload.id, {
				tag: "error",
				error: action.payload.error,
			});
			return newState;
		},
	},
});

export const { clearAll, clear, pending, success, error } =
	deletePostSlice.actions;

export default deletePostSlice.reducer;
