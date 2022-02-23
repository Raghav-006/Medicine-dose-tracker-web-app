import React from 'react';
import {useForm} from 'react-hook-form'
import Wrapper from '../component/Wrapper'

export default function Profile() {
  const {register,handleSubmit,reset, formState:{errors}}= useForm()

  const onSubmit = (data,e)=>{
    console.log(data)
    e.target.reset();
  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col">
                    <div className='form-outline mb-4'>
                      <input type={'text'} placeholder="First Name" {...register("name",{required:true})} className={'form-control'} />
                      {errors.name && <span>This field is required</span>}
                    </div>
                  </div>
                  <div className="col">
                    <div className='form-outline mb-4'>
                      <input type={"text"} placeholder={'Last Name'} {...register("email", {required:true})} className={'form-control'} />
                      {errors.email && <span>This field is required</span>}
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="190 Schieding Street" {...register("address",{required:true})} />
                    {errors.address && <span>This field is required</span>}
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" placeholder='Tswane' id="inputCity" {...register('city',{required:true})}/>
                    {errors.city && <span>This field is required</span>}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <select id="inputState" className="form-select" {...register("gender",{required: true})}>
                      <option value='' className="text-muted">Choose...</option>
                      <option value=''>...</option>
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="other">other</option>
                    </select>
                      {errors.gender && <span>This field is required</span>}
                  </div>
                  <div className="col-md-2 mb-4">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" placeholder='0002' id="inputZip" {...register('Zipcode',{required:true})}/>
                    {errors.Zipcode && <span>Zip code is required</span>}
                  </div>
                </div>
                <input type={'submit'} className="btn btn-primary" value="Save" />
                <input style={{ display: "block", marginTop: 20 }} type="button" className="d-none" onClick={() => reset()}/>
              </form>
            </div>
          </div>
        </div>
    </Wrapper>
  );
}
