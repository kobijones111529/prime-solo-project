import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { error, loading as loadingPosts, set as setPosts } from '../reducers/posts'

const qualifiedName = (name) => `saga/posts/${name}`;

const sagas = {
  fetchPosts: { type: qualifiedName('fetch'), saga: function*() {
    try {
      yield put(loadingPosts());
      const { data: posts } = yield axios.get('/api/posts');
      yield put(setPosts(posts));
    } catch (err) {
      yield put(error(err));
      console.error(err);
    }
  } },
  fetchUserPosts: { type: qualifiedName('user/fetch'), saga: function*() {
    try {
      const { data: posts } = yield axios.get('/api/user/posts');
      yield put(setPosts(posts));
    } catch (err) {
      console.error(err);
    }
  } }
};

export const fetchPosts = () => ({ type: sagas.fetchPosts.type });

export const fetchUserPosts = () => ({ type: sagas.fetchUserPosts.type });

export default function*() {
  yield takeLatest(sagas.fetchPosts.type, sagas.fetchPosts.saga);
  yield takeLatest(sagas.fetchUserPosts.type, sagas.fetchUserPosts.saga);
}
