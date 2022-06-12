import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AccountMenu from '../pages/AccountMenu'

const Nav = ({user}) =>{
    const navigate = useNavigate()
    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});
        navigate('/')
    }

  return (
    <div>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to={'/dashboard'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">{user.avatars}</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <AccountMenu className="nav-link px-3" logout={logout}/>
                </div>
            </div>
        </header>
    </div>
  )
}
export default Nav;