import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        This is a header
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
    </header>
  );
};

export default Header;