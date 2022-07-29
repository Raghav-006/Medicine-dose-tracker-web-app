import React from 'react';
import {Link} from 'react-router-dom';
import { BarChart2, Users, Home } from 'react-feather'; //Layers, PlusCircle, Film,
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills, FaLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { GrHome } from 'react-icons/gr'
import { MdOutlineHome } from 'react-icons/md' //MdOutlineHome

export default function Menu() {
  return (
    <>
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" active='true' className="nav-link" aria-current="page">
                <span data-feather="file"></span>
                <MdOutlineHome className='feather'/>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/medicine" className="nav-link">
                <span data-feather="file"></span>
                <FontAwesomeIcon icon={faPills} className='feather'/>
                Medicine 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <span><Users className="feather"/></span>
                Profile
              </Link>
            </li>
            {/*<li className="nav-item">
              <Link className="nav-link" to="/reports">
                  <BarChart2 className='feather'/>
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                  <Layers className='feather'/>
                Integrations
              </Link>
            </li>*/}
            {/*<li className="nav-item">
              <Link to="/theatre" className="nav-link">
                <span><Film className="feather"/></span>
                Theatre
              </Link>
            </li>*/}
          </ul>
          {/*<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <Link className="link-secondary" to="#!" aria-label="Add a new report">
              <span data-feather="plus-circle"><PlusCircle className='feather'/></span>
            </Link>
          </h6>*/}
        </div>
      </nav>
    </>
  );
}
