import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { fetchUser as fetchUser } from "./user";
import { clear as unsetUser } from "../reducers/user";
import { clear as clearLoginError, unspecified as loginError } from "../reducers/errors/login";

/**
 * @typedef {import("../../../types/user").LoginCredentials} LoginCredentials
 */

/**
 * @param {string} name
 */
const qualifiedName = name => `saga/${name}`;

const sagas = {
  login: {
    type: qualifiedName('login'),
    saga: function*(
      /** @type {{ payload: LoginCredentials }} */
      { payload: credentials }
    ) {
      try {
        yield put(clearLoginError());
        yield axios.post('/api/user/login', credentials, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        yield put(fetchUser());
      } catch (err) {
        console.error('uh oh');
        yield put(loginError());
      }
    }
  },
  logout: { type: qualifiedName('logout'), saga: function*() {
    try {
      yield axios.post('/api/user/logout', {
        withCredentials: true
      });
      yield put(unsetUser());
    } catch (err) {
      console.error(err);
    }
  } }
};

/**
 * @param {LoginCredentials} credentials
 */
export const login = credentials => ({
  type: sagas.login.type,
  payload: credentials
});

export const logout = () => ({ type: sagas.logout.type })

export default function*() {
  yield takeLatest(sagas.login.type, sagas.login.saga);
  yield takeLatest(sagas.logout.type, sagas.logout.saga);
}
