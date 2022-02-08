import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu() {
  return (
    <>
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" aria-current="page">
              <span data-feather="home"></span> 
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}
