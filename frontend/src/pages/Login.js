import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../Form.css';

const Login = ()=>{

    const [email,setEmail] = useState(' ');
    const [password,setPassword] = useState(' ');
    const navigate = useNavigate();
    
    const handleLoginSubmit = async (e)=>{
      e.preventDefault();
      if (!email || !password) return;
      const user = { email, password };
      const {data} = await axios.post('login',user);
  
      setEmail(' ');
      setPassword(' ');
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      return navigate("/dashboard")
    }

    return (
        <div className='App-headerss'>
            <form className='form' onSubmit={handleLoginSubmit}>
                <h4>login form</h4>
                <div className='form-row'>
                <label htmlFor='email' className='form-label'>
                    Email
                </label>
                <input
                    type='email'
                    className='form-input email-input'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className='form-row'>
                <label htmlFor='password' className='form-label'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    className='form-input password-input'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button type='submit' className='btn btn-block submit-btn'>
                submit
                </button>
            </form>
            <div className='container'>
                <a href='/register' type='button' className='btn logout-btn'>
                    Register
                </a>
            </div>
        </div>
    )
}
export default Login ;
