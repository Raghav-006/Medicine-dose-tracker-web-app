import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';
import axios from 'axios'

export default function NewMedicine() {
  const [name,setName]= useState('')
  const [dosage,setDosage]= useState('')
  const [frequency,setFrequency]= useState('')
  const Meds = async (e)=>{
    e.preventDefault()
    if (!name || !dosage || !frequency) return;
      const medicine = { name, dosage, frequency };
    await axios.post('',medicine,{withCredentials:true})

  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2'>Enter new forms</h1>
      </div>
      <div className='formss'>
          <form className="row g-3 needs-validation" novalidate onSubmit={Meds}>
            <div class="col-md-4">
              <label for="validationCustom01" class="form-label">Medicine name</label>
              <input type="text" className="form-control" id="validationCustom01" value={name} onChange={(e)=>setName(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustom02" className="form-label">Dosage</label>
              <input type="text" className="form-control" id="validationCustom02" value={dosage} onChange={(e)=>setDosage(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustomUsername" className="form-label">Frequency</label>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" onChange={(e)=>setFrequency(e.target.vakue)} required />
                <div className="valid-feedback">
                  Please choose a username.
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
