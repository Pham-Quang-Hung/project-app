import React, { useContext } from 'react'
import AppContext from './AppContext';

import { Link } from 'react-router-dom'
import '../css/header.css'
export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  //update current user
  const signOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "CURRENT_USER", payload: null });
  }

  return (
    <div>
      <header className="header">
        {user ? (
          <><h1 className="logo"><Link to={'/gethome'}>Home</Link></h1></>
        ) : (
          <><h1 className="logo"><Link to={'/'}>Home</Link></h1></>
        )}
        <nav>
          <ul className=" main-nav">
            {user ? (
              <>
                <li><span className="user-name"> { user.userName }</span></li>
                <li><Link to={'/loadedmoney'}>Loaded Money</Link></li>
                <li><Link to={'/transaction'}>Transfer Money</Link></li>
                <li><Link to={'/withdrawmoney'}>Withdraw Money</Link></li>
                <li><Link to={'/notification'}>Notification</Link></li>
                <li><a href="/" onClick={() => signOut()}>Sign out</a></li>
              </>
            ) : (
              <> 
                <li><Link to={'/register'}>Register</Link></li>
              </>
            )}
          </ul>

        </nav>
      </header>
    </div>
  )
}
