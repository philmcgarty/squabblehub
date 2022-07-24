import React from 'react';
import { Link } from 'react-router-dom';
import textLogo from '../images/SquabbleHub-text-logo-v1 .png'
import graphicLogo from '../images/SquabbleHub-graphic-logo-v1.png'

const Header = () => {
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

          {/* <!-- Login & SignUp  --> */}
          <div className="col col-sm-12 col-lg-3">
            <span>
              {/* <!-- Login --> */}
              <div className="btn-group-lg">
                <Link to="/login" className="btn btn-primary active" aria-current="page">Login</Link>
                <Link to="/login" className="btn btn-danger">Sign Up</Link>
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