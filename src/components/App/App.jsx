import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import Feed from '../Feed/Feed';
import UserPosts from '../UserPosts/UserPosts'
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';
import ViewUserPost from '../UserPosts/ViewUserPost/ViewUserPost';
import CreatePost from '../CreatePost/CreatePost';
import { fetchUser as fetchUser } from '../../redux/sagas/user';
import EditUserPost from '../UserPosts/EditUserPost/EditUserPost';
import { useAppSelector } from '../../redux/hooks';

function App() {
  const dispatch = useDispatch();

  const user = useAppSelector(store => store.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/feed" />

          <Route exact path="/feed">
            <Feed />
          </Route>

          <ProtectedRoute exact path="/posts">
            <UserPosts />
          </ProtectedRoute>

          <ProtectedRoute exact path="/posts/new">
            <CreatePost />
          </ProtectedRoute>

          <ProtectedRoute exact path="/posts/:id">
            <ViewUserPost />
          </ProtectedRoute>

          <ProtectedRoute exact path="/posts/:id/edit">
            <EditUserPost />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.tag === 'Some' ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/feed" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.tag === 'Some' ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
