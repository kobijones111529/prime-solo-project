import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  pending as pendingDeletePost,
  success as deletePostSuccess,
  error as deletePostError
} from "redux/reducers/errors/deletePost";
import {
  error as postsError,
  loading as loadingPosts,
  set as setPosts
} from '../reducers/posts'
import {
  error as createPostError,
  pending as pendingCreatePost,
  success as createPostSuccess
} from "redux/reducers/errors/createPost";

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
      yield put(postsError(err));
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
      yield put(postsError(err));
      console.error(err);
    }
  } },
  postNewPost: {
    type: qualifiedName('new'),
    saga: function*(
      /** @type {{ payload: NewPost }} */
      { payload: data }
    ) {
      yield put(pendingCreatePost());
      try {
        yield axios.post('/api/posts', data, {
          withCredentials: true
        });
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 401:
              yield put(createPostError('unauthenticated'));
              break;
            default:
              yield put(createPostError('unspecified'));
          }
        } else {
          yield put(createPostError('unspecified'));
        }
      }
      yield put(createPostSuccess());
      yield put(fetchPosts());
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
  } },
  deletePost: {
    type: qualifiedName('delete'),
    saga: function*(
      /** @type {{ payload: { id: number } }} */
      { payload: { id } }
    ) {
      yield put(pendingDeletePost(id));
      try {
        yield axios.delete(`/api/posts/${id}`, {
          withCredentials: true
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(err);
          switch (err.response?.status) {
            case 401:
              yield put(deletePostError({ id, error: 'unauthenticated' }));
              break;
            case 403:
              yield put(deletePostError({ id, error: 'unauthorized' }));
              break;
            case 404:
              yield put(deletePostError({ id, error: 'not_found' }));
              break;
            default:
              yield put(deletePostError({ id, error: 'unspecified' }));
          }
        } else {
          yield put(deletePostError({ id, error: 'unspecified' }));
        }
      }
      yield put(deletePostSuccess(id));
      yield put(fetchPosts());
    }
  }
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
/**
 * @param {number} id
 */
export const deletePost = id => ({ type: sagas.deletePost.type, payload: { id } });

export default function*() {
  yield takeLatest(sagas.fetchPosts.type, sagas.fetchPosts.saga);
  yield takeLatest(sagas.fetchUserPosts.type, sagas.fetchUserPosts.saga);
  yield takeEvery(sagas.postNewPost.type, sagas.postNewPost.saga);
  yield takeEvery(sagas.editPost.type, sagas.editPost.saga);
  yield takeEvery(sagas.deletePost.type, sagas.deletePost.saga);
}
