import React from 'react';
import { Link} from 'react-router-dom';
import {toast } from 'react-toastify';
import axios from 'axios';
import styles from '../Styles/Nav.module.css';

const Nav = ({user}) =>{
    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});
    }

    const nav_user={
        color:'ghostwhite',
    }
    const notify = () => toast.success("Wow so easy!");

  return (
    <div>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to={'/dashboard'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Ronewa app</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='navbar-nav'>
                <ul className="nav mb-2 mb-lg-0" style={nav_user}>
                    <li className="nav-item">
                        <Link className="nav-link px-3" style={nav_user} to='/profile'>{user.name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={logout} to="/" className="nav-link px-3" style={nav_user}>Sign out</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={notify}>Notify!</button>
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
export default Nav;