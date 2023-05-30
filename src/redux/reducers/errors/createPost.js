import { createSlice } from '@reduxjs/toolkit';

/**
 * @template T
 * @typedef {import('./status').Status<T>} Status
 */

/**
 * @typedef {'unauthenticated' | 'unspecified'} CreateError
 */

/**
 * @param {string} name
 */
const qualifiedName = name => `errors/post/${name}`;

/**
 * @returns {Status<CreateError> | null}
 */
const initialState = () => null;

const createPostSlice = createSlice({
  name: qualifiedName('create'),
  initialState,
  reducers: {
    clear: () => null,
    success: (_) => ({ tag: 'success' }),
    pending: (_) => ({ tag: 'pending' }),
    /**
     * @param {{ payload: CreateError }} action
     */
    error: (_, action) => ({ tag: 'error', error: action.payload })
  }
});

export const {
  clear,
  success,
  pending,
  error
} = createPostSlice.actions;

export default createPostSlice.reducer;
