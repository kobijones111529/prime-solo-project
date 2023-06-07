import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
	set as setPost,
	loading as loadingPost,
	error as postError,
} from "../reducers/post";

/**
 * @typedef {import("../../../types/posts").Post} Post
 */

/**
 * @param {string} name
 */
const qualifiedName = (name) => `saga/post/${name}`;

const sagas = {
	fetchPost: {
		type: qualifiedName("fetch"),
		saga: function* (
			/** @type {{ payload: { id: number } }} */
			{ payload: id }
		) {
			try {
				yield put(loadingPost());
				/** @type {{ data: Post }} */
				const { data: post } = yield axios.get(`/api/posts/${id}`);
				yield put(setPost(post));
			} catch (err) {
				yield put(postError(err));
			}
		},
	},
};

/**
 * @param {number} id
 */
export const fetchPost = (id) => ({ type: sagas.fetchPost.type, payload: id });

export default function* () {
	yield takeLatest(sagas.fetchPost.type, sagas.fetchPost.saga);
}
