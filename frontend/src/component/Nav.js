import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const rootUrl = 'http://localhost:3010/';

const Nav = () =>{
    const [products,setProducts]= useState({});

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`${rootUrl}users`,{withCredentials: true,});
                setProducts(response.data);
                //console.log(response.data);
            }
        )();
    }, []);
    console.log(products);
    //console.log(products.names.name);

    const onLogout = async () =>{
        const {data} = 
        await axios.get(`${rootUrl}signout`,{withCredentials: true});
        console.log(data);
    }

  return (
    <div>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to={'/dashboard'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Ronewa app</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link className="nav-link px-3" onClick={onLogout} to="/">{'products.names'}</Link>
                </div>
                <div className="nav-item text-nowrap">
                    <Link className="nav-link px-3" onClick={onLogout} to="/">Sign out</Link>
                </div>
            </div>
        </header>
    </div>
  )
}
export default Nav;