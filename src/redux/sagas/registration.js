import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { login } from "./login";

/**
 * @typedef {import("../../../types/user").RegistrationCredentials} RegistrationCredentials
 */

/**
 * @param {string} name
 */
const qualifiedName = name => `saga/${name}`;

const sagas = {
  register: {
    type: qualifiedName('register'),
    saga: function*(
      /** @type {{ payload: RegistrationCredentials }} */
      { payload: credentials }
    ) {
      try {
        yield axios.post('/api/user/register', credentials);
        yield put(login(credentials));
      } catch (err) {
        console.error(err);
      }
    }
  }
};

/**
 * @param {RegistrationCredentials} credentials
 */
export const register = credentials => ({
  type: sagas.register.type,
  payload: credentials
});

export default function*() {
  yield takeEvery(sagas.register.type, sagas.register.saga);
}
