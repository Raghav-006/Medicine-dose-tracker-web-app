import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Form.css';
//const rootUrl = 'http://localhost:3010';

const Login = ()=>{

    const [email,setEmail] = useState(' ');
    const [password,setPassword] = useState(' ');
    const navigate = useNavigate();
    
    const handleLoginSubmit = async (e)=>{
      e.preventDefault();
      if (!email || !password) return;
      const user = { email, password };
      const {data} = await axios.post('login',user,{withCredentials:true});

      axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;
  
      setEmail(' ');
      setPassword('');

      if(data.message === 'success') {return navigate('/dashboard')}
      if(data.message === 'invalid credntials'){
         return toast.error('Invalid credntials')
      } 
      if(data.message ==='user not found'){
       return toast.error('User not found')
      }
    }

    return (
        <div className='App-headers'>
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
                <a href='/register' type='button' className='btn logout-btn' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                    <cite>Register</cite>
                </a>
            </div>
        </div>
    )
}
export default Login ;
