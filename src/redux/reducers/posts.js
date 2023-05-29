import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {import("../../../types/posts").Post} Post
 */

/**
 * @typedef {'None' | 'Loading' | 'Some' | 'Error'} PostsTag
 * @typedef {{ tag: PostsTag }} TaggedPosts
 * @typedef {{ tag: 'None' }} None
 * @typedef {{ tag: 'Loading' }} Loading
 * @typedef {{ tag: 'Some', posts: any }} Some
 * @typedef {{ tag: 'Error', error: any }} Error
 * @typedef {TaggedPosts & (None | Loading | Some | Error)} PostsState
 */

/** @type {() => PostsState} */
const initialState = () => ({ tag: 'None' })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (_) => ({ tag: 'None' }),
    loading: (_) => ({ tag: 'Loading' }),
    /**
     * @param {{ payload: Post[] }} action
     */
    set: (_, action) => ({ tag: 'Some', posts: [...action.payload] }),
    /**
     * @param {{ payload: any }} action
     */
    error: (_, action) => ({ tag: 'Error', error: action.payload })
  }
});

export const {
  clear,
  loading,
  set,
  error
} = postsSlice.actions;

export default postsSlice.reducer;
