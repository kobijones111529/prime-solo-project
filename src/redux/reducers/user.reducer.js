import { combineReducers } from "redux";
import userPostsReducer from "./userPosts.reducer";

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export const reducers = {
  posts: userPostsReducer
};
