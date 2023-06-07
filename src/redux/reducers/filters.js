import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {import('../../../types/filters').LocationFilter} LocationFilter
 */

/**
 * @typedef {import('../../../types/filters').Filters} Filters
 */

/**
 * @returns {Filters}
 */
const initialState = () => ({});

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		clear: () => ({}),
		/**
		 * @param {{ payload: LocationFilter | null }} action
		 */
		setLocationFilter: (state, action) => {
			if (action.payload) {
				state.location = action.payload;
			} else {
				delete state.location;
			}
		},
	},
});

export const { clear, setLocationFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
