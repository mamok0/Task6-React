import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className=".navbar bg-dark text-light">
    <span className="navbar-brand m-2"><Link to="/">GifSearch</Link></span>
  </header>
);

export default Header;
