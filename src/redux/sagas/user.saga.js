import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchPosts() {
  try {
    const { data: posts } = yield axios.get('/api/user/posts');
    yield put({ type: 'SET_USER_POSTS', payload: posts });
  } catch (err) {
    console.error('Failed to fetch user posts:', err);
  }
}

function* fetchPost({ payload: id }) {
  try {
    const { data: post } = yield axios.get(`/api/posts/${id}`);
    yield put({ type: 'SET_POST', payload: post });
  } catch (err) {
    console.error('Failed to fetch user post:', err);
  }
}

function* postPost({ payload: post }) {
  try {
    yield axios.post('/api/posts', {
      type: post.type,
      plantName: post.plantName,
      imageUrl: post.imageUrl,
      description: post.description,
      latitude: post.location.latitude,
      longitude: post.location.longitude,
      contactUrl: post.contactUrl
    });
  } catch (err) {
    console.error('Failed to post:', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_POSTS', fetchPosts);
  yield takeLatest('FETCH_POST', fetchPost);
  yield takeEvery('POST_NEW_POST', postPost);
}

export default userSaga;
