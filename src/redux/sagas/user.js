import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { set as setUser } from "../reducers/user";
import {
	clear as clearError,
	unspecified as unspecifiedError,
	unauthenticated as userUnauthenticated,
} from "../reducers/errors/user";

/**
 * @template T
 * @typedef {import('redux-saga/effects').ForkEffect} ForkEffect
 */

/**
 * @param {string} name
 * @returns {string}
 */
const qualifiedName = (name) => `saga/user/${name}`;

const sagas = {
	fetchUser: {
		type: qualifiedName("fetch"),
		saga: function* () {
			try {
				const { data: user } = yield axios.get("/api/user");
				yield put(setUser(user));
				yield put(clearError());
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 403) {
					yield put(userUnauthenticated());
				} else {
					yield put(unspecifiedError());
				}
			}
		},
	},
};

export const fetchUser = () => ({ type: sagas.fetchUser.type });

/**
 * @yields {ForkEffect<never>}
 */
export default function* () {
	yield takeLatest(sagas.fetchUser.type, sagas.fetchUser.saga);
}
