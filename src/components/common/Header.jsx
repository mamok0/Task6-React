import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="navbar navbar-dark bg-dark navbar-expand-lg">
    <span className="navbar-brand m-2"><Link to="/">GifSearch</Link></span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <span className="nav-link m-2"><Link to="/addGif">AddGif</Link></span>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
