import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';

import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Footer';

import Feed from 'components/Posts/Feed/Feed';
import UserPosts from 'components/Posts/UserPosts/ViewUserPosts/UserPosts';
import LoginPage from 'components/LoginPage/LoginPage';
import RegisterPage from 'components/RegisterPage/RegisterPage';

import './App.css';
import ViewUserPost from 'components/Posts/UserPosts/ViewUserPost/ViewUserPost';
import CreatePost from 'components/Posts/UserPosts/CreatePost/CreatePost';
import { fetchUser as fetchUser } from 'redux/sagas/user';
import EditUserPost from 'components/Posts/UserPosts/EditPost/EditPost';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

function App() {
  const dispatch = useAppDispatch();

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
