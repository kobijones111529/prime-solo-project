import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user, { reducers as userReducers } from './user.reducer';
import posts from './posts.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  userPosts: userReducers.posts,
  posts
});

export default rootReducer;
