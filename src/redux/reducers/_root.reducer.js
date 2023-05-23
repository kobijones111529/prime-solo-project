import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import posts from './posts.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  posts
});

export default rootReducer;
