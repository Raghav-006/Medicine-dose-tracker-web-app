import React from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const Nav = ({user}) =>{
    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});
    }

  return (
    <div>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to={'/dashboard'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Ronewa app</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link className="nav-link px-3" to={'/profile'}>{user.name}</Link>
                    <Link onClick={logout} to="/" className="nav-link px-3">Sign out</Link>
                </div>
            </div>
        </header>
    </div>
  )
}
export default Nav;