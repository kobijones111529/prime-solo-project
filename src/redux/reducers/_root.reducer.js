import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user, { reducers as userReducers } from './user.reducer';
import posts from './posts.reducer';
import post from './post.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  userPosts: userReducers.posts,
  posts,
  post
});

export default rootReducer;
