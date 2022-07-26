import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import textLogo from '../images/SquabbleHub-text-logo-v1 .png';
import graphicLogo from '../images/SquabbleHub-graphic-logo-v1.png';
import Auth from '../utils/auth';

const Header = () => {
  const location = useLocation();
  
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };  
  
  const buttonRender = function (){
    // if not logged in
    if (!Auth.loggedIn()) {
      return (
      <>
        <Link to="/login" className="btn btn-primary active" aria-current="page">Login</Link>
        <Link to="/login" className="btn btn-danger">Sign Up</Link>
      </>
      )
    } else {
      // if logged in and on homepage - display logout/profile
      if (location.pathname === "/") {
        return (
        <>
          <a href="/" onClick={logout} className="btn btn-primary active" aria-current="page">Logout</a>
          <Link to="/profile" className="btn btn-danger">Profile</Link>
        </>
        )
      } else {
        // else if on profile page - display logout/home
        return (
        <>
          <a href="/" onClick={logout} className="btn btn-primary active" aria-current="page">Logout</a>
          <Link to="/" className="btn btn-danger">Home</Link>
        </>
        )
      }
    }
  }

  return (
    <header>

      {/* <Link to="/profile">Profile</Link> */}

      {/* NAV */}
      <nav className="navbar bg-light text-center">
        <div className="row justify-content-center container-fluid">
          {/* <!-- logo text --> */}
          <Link to="/home" className="col col-sm-12 col-lg-3 navbar-brand">
            <img className="img-fluid" src={textLogo} alt="SquabbleHub" />
          </Link>

          {/* <!-- logo image --> */}
          <div className="col col-sm-12 col-lg-3" id="SH-Graphic">
            <img className="img-fluid" src={graphicLogo} alt="SquabbleHub Logo" />
          </div>

          {/* <!-- Nav Buttons  --> */}
          <div className="col col-sm-12 col-lg-3">
            <span>
              <div className="btn-group-lg">
                {/* render correct button set */}
                {buttonRender()}
              </div>
            </span>
          </div>

        </div>
      </nav>
      {/* NAV END */}
    </header>
  );
};

export default Header;