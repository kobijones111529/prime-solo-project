import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { error, loading as loadingPosts, set as setPosts } from '../reducers/posts'

/**
 * @typedef {import("../../../types/posts").Post} Post
 * @typedef {import("../../../types/posts").NewPost} NewPost
 * @typedef {import("../../../types/posts").EditPost} EditPost
 */

/**
 * @param {string} name
 */
const qualifiedName = name => `saga/posts/${name}`;

const sagas = {
  fetchPosts: { type: qualifiedName('fetch'), saga: function*() {
    try {
      yield put(loadingPosts());
      /** @type {{ data: Post[] }} */
      const { data: posts } = yield axios.get('/api/posts');
      yield put(setPosts(posts));
    } catch (err) {
      yield put(error(err));
      console.error(err);
    }
  } },
  fetchUserPosts: { type: qualifiedName('user/fetch'), saga: function*() {
    try {
      yield put(loadingPosts());
      /** @type {{ data: Post[] }} */
      const { data: posts } = yield axios.get('/api/user/posts');
      yield put(setPosts(posts));
    } catch (err) {
      yield put(error(err));
      console.error(err);
    }
  } },
  postNewPost: {
    type: qualifiedName('new'),
    saga: function*(
      /** @type {{ payload: NewPost }} */
      { payload: data }
    ) {
      try {
        yield axios.post('/api/posts', data, {
          withCredentials: true
        });
        yield put(fetchPosts());
      } catch (err) {
        console.error(err);
      }
    }
  },
  editPost: { type: qualifiedName('edit'), saga: function*(
    /** @type {{ payload: { id: Number, data: EditPost } }} */
    { payload: { id, data } }
  ) {
    try {
      yield axios.patch(`/api/posts/${id}`, data, {
        withCredentials: true
      });
      yield put(fetchPosts());
    } catch (err) {
      console.error(err);
    }
  } }
};

export const fetchPosts = () => ({ type: sagas.fetchPosts.type });
export const fetchUserPosts = () => ({ type: sagas.fetchUserPosts.type });
/**
 * @param {NewPost} post
 */
export const postNewPost = post => ({ type: sagas.postNewPost.type, payload: post });
/**
 * @param {number} id
 * @param {EditPost} data
 */
export const editPost = (id, data) => ({ type: sagas.editPost.type, payload: { id, data } });

export default function*() {
  yield takeLatest(sagas.fetchPosts.type, sagas.fetchPosts.saga);
  yield takeLatest(sagas.fetchUserPosts.type, sagas.fetchUserPosts.saga);
  yield takeEvery(sagas.postNewPost.type, sagas.postNewPost.saga);
  yield takeEvery(sagas.editPost.type, sagas.editPost.saga);
}
