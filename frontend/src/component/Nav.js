import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AccountMenu from '../pages/AccountMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Nav = ({user}) =>{
  const navigate = useNavigate();
    const logout = async () => {
      await axios.post('logout', {}, {withCredentials: true});
        navigate('/')
    }

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
          <Link to={'/dashboard'} className="navbar-brand">{user.name}</Link>
            <div className="navbar-nav ml-auto">
              <div className="nav-item d-flex justify-content-between">
                <div className="me-2">
                  <AccountMenu className="nav-link px-3" logout={logout}/>
                </div>
                  <button className="navbar-toggler d-md-none collapsed px-3" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} color='ghostwhite' />
                  </button>
              </div>
            </div>
        </div>
      </header>
    </div>
  )
}
export default Nav;