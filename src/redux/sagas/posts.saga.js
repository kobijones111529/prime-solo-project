import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'

function* fetchPosts() {
  const { data: posts } = yield axios.get('/api/posts');
  yield put({ type: 'SET_POSTS', payload: posts });
}

export default function*() {
  yield takeLatest('FETCH_POSTS', fetchPosts);
}
