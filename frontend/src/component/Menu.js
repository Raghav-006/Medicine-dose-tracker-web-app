import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu() {
  return (
    <>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link to="/dashboard" class="nav-link" aria-current="page">
              <span data-feather="home"></span> 
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/users" class="nav-link">
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
