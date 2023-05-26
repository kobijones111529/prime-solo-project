import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { set as setPost, unset as unsetPost } from "../reducers/post";

const qualifiedName = name => `saga/post/${name}`;

const sagas = {
  fetchPost: { type: qualifiedName('fetch'), saga: function*({ payload: id }) {
    try {
      const { data: post } = yield axios.get(`/api/posts/${id}`);
      yield put(setPost(post));
    } catch (err) {
      yield put(unsetPost());
    }
  } }
};

export const fetchPost = id => ({ type: sagas.fetchPost.type, payload: id });

export default function*() {
  yield takeLatest(sagas.fetchPost.type, sagas.fetchPost.saga);
}
