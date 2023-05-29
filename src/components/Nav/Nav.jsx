import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton/LogOutButton';
import './Nav.css';
import { useAppSelector } from '../../redux/hooks';

function Nav() {
  const user = useAppSelector((store) => store.user);

  return (
    <nav className="nav">
      <Link to="/feed">
        <h2 className="nav-title">Feed</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.tag !== 'Some' && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.tag === 'Some' && (
          <>
            <Link className="navLink" to="/posts">
              Posts
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
