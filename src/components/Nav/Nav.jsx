import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from './LogOutButton/LogOutButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './Nav.module.css';
import { logout } from 'redux/sagas/login';

function Nav() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const showLogin = () => {
    if (user.tag === 'Some') {
      return (
        <a onClick={() => dispatch(logout())}>Logout</a>
      );
    } else {
      return (
        <a onClick={() => history.push('/login')}>Login</a>
      );
    }
  };

  const showNav = () => {
    return (
      <ol className={styles['nav']}>
        <li className={styles['nav-item']}>
          <div>
          {showLogin()}
          </div>
        </li>
        <li className={styles['home-button-container']}>
          <button onClick={() => history.push('/')} className={styles['home-button']}>
            <i className="fa-solid fa-house" />
          </button>
        </li>
        <li className={styles['nav-item']}>
          <div>
          <a onClick={() => history.push('/posts')}>
            Posts
          </a>
          </div>
        </li>
      </ol>
    );
  };

  return (
    <nav className={styles['container']}>
      {showNav()}
      {/* <Link to="/feed">
        <h2 className="nav-title">Feed</h2>
      </Link> */}
      {/* <div> */}
        {/* If no user is logged in, show these links */}
        {/* {user.tag !== 'Some' && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {/* {user.tag === 'Some' && (
          <>
            <Link className="navLink" to="/posts">
              Posts
            </Link>

            <LogOutButton className="navLink" />
          </>
        )} */}
      {/* </div> */}
    </nav>
  );
}

export default Nav;
