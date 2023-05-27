import { createSlice } from "@reduxjs/toolkit";

export const UserState = {
  None: Symbol('None'),
  Loading: Symbol('Loading'),
  User: Symbol('User'),
  Error: Symbol('Error')
};

export const UserError = {
  Unauthenticated: Symbol('Unauthenticated'),
  Error: Symbol('Error')
};

const userSlice = createSlice({
  name: 'user',
  initialState: { tag: UserState.None },
  reducers: {
    clear: () => ({ tag: UserState.None }),
    loading: () => ({ tag: UserState.Loading }),
    set: (_, { payload: user }) => ({ tag: UserState.User, user }),
    error: (_, { payload: error }) => ({ tag: UserState.Error, error })
  }
});

export const { set, clear } = userSlice.actions;

export default userSlice.reducer;
