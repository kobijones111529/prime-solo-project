import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { Status } from "./status";

enableMapSet();

type DeleteError =
	| "not_found"
	| "unauthenticated"
	| "unauthorized"
	| "unspecified";

const qualifiedName = (name: string) => `errors/post/${name}`;

const initialState = (): Map<number, Status<DeleteError>> => new Map();

const deletePostSlice = createSlice({
	name: qualifiedName("delete"),
	initialState,
	reducers: {
		clearAll: () => new Map(),
		clear: (state, action: { payload: number }) => {
			const newState = new Map(state);
			newState.delete(action.payload);
			return newState;
		},
		pending: (state, action: { payload: number }) => {
			const newState = new Map(state);
			newState.set(action.payload, { tag: "pending" });
			return newState;
		},
		success: (state, action: { payload: number }) => {
			const newState = new Map(state);
			newState.set(action.payload, { tag: "success" });
			return newState;
		},
		error: (state, action: { payload: { id: number; error: DeleteError } }) => {
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
