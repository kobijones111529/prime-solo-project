import { createSlice } from "@reduxjs/toolkit";

export const PostsState = {
  None: Symbol('None'),
  Loading: Symbol('Loading'),
  Posts: Symbol('Posts'),
  Error: Symbol('Error')
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: { tag: PostsState.None },
  reducers: {
    clear: () => ({ tag: PostsState.None }),
    loading: () => ({ tag: PostsState.Loading }),
    set: (_, { payload: posts }) => ({ tag: PostsState.Posts, posts: [...posts] }),
    error: (_, { payload: error }) => ({ tag: PostsState.Error, error })
  }
});

export const {
  clear,
  loading,
  set,
  error
} = postsSlice.actions;

export default postsSlice.reducer;
