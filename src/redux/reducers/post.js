import { createSlice } from "@reduxjs/toolkit";

export const PostState = {
  None: Symbol('None'),
  Loading: Symbol('Loading'),
  Post: Symbol('Post'),
  Error: Symbol('Error')
};

const postSlice = createSlice({
  name: 'post',
  initialState: { tag: PostState.None },
  reducers: {
    clear: () => ({ tag: PostState.None }),
    loading: () => ({ tag: PostState.Loading }),
    set: (_, { payload: post }) => ({ tag: PostState.Post, post }),
    error: (_, { payload: error }) => ({ tag: PostState.Error, error })
  }
});

export const {
  clear,
  loading,
  set,
  error
} = postSlice.actions;

export default postSlice.reducer;
