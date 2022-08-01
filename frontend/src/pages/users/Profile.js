import React,{useState, useEffect} from 'react';
//import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import Wrapper from '../../component/Wrapper';
import axios from 'axios';
import {toast} from 'react-toastify';
import PuffLoader from 'react-spinners/PuffLoader';
import ProfileView from './ProfileView';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Profile() {
  //let navigate = useNavigate();
  const {register,handleSubmit,reset, formState:{errors}}= useForm();
  const [profiles,setProfile] = useState([]);
  const [loader,setLoader] = useState(false);
  const [nodata, setNodata] = useState(false);

  useEffect(() => {
    ( 
      async () => {
        setLoader(true);
      const {data} = await axios.get('profile',{withCredentials:true});
      setTimeout(() => {
        setLoader(false)
      },3000);
      console.log(data);
      const datas = data.data;
      if(datas.length === 0){
        setNodata(true)
      };
      setProfile(datas)
    })();
  }, []);

  const onSubmit = async(data,e)=>{
    console.log(data)
    const profile =  await axios.post('profile',data,{withCredentials:true})
    console.log(profile)
    if(profile.msg=== 'success'){
      toast.success(profile.msg)
    }
    e.target.reset();
  };

  return (
    <Wrapper>
      {
        loader ?
          <div style={style}>
            <PuffLoader size={40} color={'#F37A24'} css={override} loading={loader} />
          </div>
        :(
          nodata ? 
          <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className='h2 text-muted'>No Profile yet, Let's add one!</h1>
          </div>
            <div className='container'>
              <div className='row'>
                <div className='col-md-8'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col">
                        <div className='form-outline mb-4'>
                          <label htmlFor="FirstName" className="form-label">First Name</label>
                          <input type={'text'} id='FirstName' placeholder="First Name" value={profiles.name} {...register("name",{required:true})} className={'form-control'} />
                          {errors.name && <span>This field is required</span>}
                        </div>
                      </div>
                      <div className="col">
                        <div className='form-outline mb-4'>
                          <label htmlFor="LastName" className="form-label">Last Name</label>
                          <input type={"text"} id='LastName' placeholder={'Last Name'} value={profiles.surname} {...register("surname", {required:true})} className={'form-control'} />
                          {errors.email && <span>This field is required</span>}
                        </div>
                      </div>
                      <div className="row">
                        <div className='col-auto mb-4'>
                          <label className="form-label" htmlFor="cellphone">CellPhone Number</label>
                          <input type="cell" className="form-control" placeholder={'Cellphone Number'} id="cellphone" value={profiles.cellphone} {...register("cellphone",{required:true})} />
                        </div>
                      </div>

                      <div className="col-12 mb-4">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" value={profiles.address} placeholder="190 Schieding Street" {...register("address",{required:true})} />
                        {errors.address && <span>This field is required</span>}
                      </div>
                    </div>
                    <div className='row'>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="inputCity" className="form-label">City</label>
                        <input type="text" className="form-control" placeholder='Tswane' value={profiles.city} id="inputCity" {...register('city',{required:true})}/>
                        {errors.city && <span>This field is required</span>}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="inputState" className="form-label">State</label>
                        <input type="text" className="form-control" placeholder='Province' value={profiles.state} id="inputCity" {...register('state',{required:true})}/>
                          {errors.gender && <span>This field is required</span>}
                      </div>
                      <div className="col-md-2 mb-4">
                        <label htmlFor="inputZip" className="form-label">Zip</label>
                        <input type="text" className="form-control" value={profiles.zipcode} placeholder='0002' id="inputZip" {...register('zipcode',{required:true})}/>
                        {errors.Zipcode && <span>Zip code is required</span>}
                      </div>
                    </div>
                    <input type={'submit'} className="btn btn-primary" value="Save" />
                    <input style={{ display: "block", marginTop: 20 }} type="button" className="d-none" onClick={() => reset()}/>
                  </form>
                </div>
              </div>
            </div>
        </>
      :
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className='h2 text-muted'>Profile</h1>
          </div>
            <div className="container">
              <div className="row">
              {
                profiles.map((profile,i)=>{
                  return (
                    <ProfileView
                      key={i}
                      avator={profile.avator}
                      name={profile.name}
                      surname={profile.surname}
                      cellphone={data.cellphone}
                      address={data.address}
                      city={profile.city}
                      state={profile.state}
                      id={profile.id}
                      zipcode={profile.zipcode}
                    />
                  )
                })
              }
              </div>
            </div>
        </>
      )}
    </Wrapper>
  );
};

const style = { position: "fixed", top: "50%", left: "60%", transform: "translate(-50%, -50%)" };


