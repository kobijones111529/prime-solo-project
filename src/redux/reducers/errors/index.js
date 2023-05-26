import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from './login'
import registrationReducer from './registration';
import userReducer from './user'

export default combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  user: userReducer
});