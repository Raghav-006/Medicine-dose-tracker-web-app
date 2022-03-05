import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Menu from './Menu';
//const rootUrl = 'http://localhost:3010/';

const Wrapper =(props)=> {
  const navigate = useNavigate();
  const [user,setUser]= useState('');

  useEffect(() => {
      (
        async () => {
          const {data} = await axios.get('user',{withCredentials:true});
          setUser(data);
          
          if(!data.name){navigate('/')}
        }
      )();
  }, [navigate]);

  return (
    <>
      <Nav user={user}/>
        <div className="container-fluid">
        <div className="row">
            <Menu/>
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {props.children}
              </main>
        </div>
        </div>
    </>
  )
  
}

export default Wrapper;
