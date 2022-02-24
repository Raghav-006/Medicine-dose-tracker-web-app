import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Try =()=> {
    const [checked,setChecked] = useState(false);
    const { register, 
        handleSubmit, 
        reset,
        formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async(datas, e) =>{
        console.log(datas);
        e.target.reset();
        let email = datas.email;
        let password = datas.password;

        //if (!data.email || !data.password) return;
        const user = { email, password };
        console.log(user)
        const {data} = await axios.post('login',user,{withCredentials:true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;
            
        if(data.message === 'success') {return navigate('/dashboard')}
        if(data.message === 'invalid credntials'){
            return toast.error('Invalid credntials')
        } 
        if(data.message ==='user not found'){
        return toast.error('User not found')
        }
    } 

    const handleChange = ()=>{
        setChecked(!checked)
    }

  return (
    <>  
        <div id="intro" className="bg-images shadow-2-strong" style={{height: '100vh'}}>
            <div className="mask d-flex align-items-center h-100 tt">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <form className="bg-white  rounded-5 shadow-5-strong p-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mb-4">
                                    {errors.email && <span style={{color:'red'}}>Email is required</span>}
                                    {errors.email && errors.email.type === "pattern" && ( <p className="errorMsg">Email is not valid.</p> )}
                                    <input type="email" id="form1Example1" className="form-control" {...register("email",{required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} />
                                    <label className="form-label" htmlFor="form1Example1">Email address</label>
                                </div>
                                <div className="form-outline mb-4">
                                    {errors.password && <span style={{color:'red'}}>Password is required</span>}
                                    {errors.password && errors.password.type === "minLength" && (<p className="errorMsg">Password should be at-least 6 characters. </p>)}
                                    <input type="password" id="form1Example2" className="form-control" {...register("password", { required: true, minLength: 6 })} />
                                    <label className="form-label" htmlFor="form1Example2">Password</label>
                                </div>
                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-center">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="form1Example3" {...register("remember_me")} checked={checked} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="form1Example3">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                        <div className="col text-center">
                                            <a href="#!">Forgot password?</a>
                                        </div>
                                </div>
                               
                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                                <input
                                    style={{ display: "block", marginTop: 20 }}
                                    type="button"
                                    className="d-none"
                                    onClick={() => reset()}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Try
