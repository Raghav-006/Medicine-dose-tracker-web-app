import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';

export default function NewMedicine() {
  const []= useState('')
  const []= useState('')
  const Meds = (e)=>{
    e.preventDefault()
  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2'>Enter new forms</h1>
      </div>
      <div className='formss'>
          <form className="row g-3 needs-validation" novalidate onSubmit={Meds}>
            <div class="col-md-4">
              <label for="validationCustom01" class="form-label">First name</label>
              <input type="text" className="form-control" id="validationCustom01" value="Mark" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustom02" className="form-label">Last name</label>
              <input type="text" className="form-control" id="validationCustom02" value="Otto" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustomUsername" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
        </div>
    </Wrapper>
  );
}
