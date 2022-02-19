import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';
import axios from 'axios'

export default function NewMedicine() {
  const [name,setName]= useState('')
  const [dosage,setDosage]= useState('')
  const [frequency,setFrequency]= useState('')

  const Meds = async (e)=>{
    e.preventDefault();
    if (!name || !dosage || !frequency) return;
      const medicine = { name, dosage, frequency };
      const {data} = await axios.post('medicine',medicine,{withCredentials:true})
    console.log(medicine)
    console.log(data)

  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2'>Enter new forms</h1>
      </div>
      <div className='formss'>
          <form className="row g-3" onSubmit={Meds}>
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label">Medicine name</label>
              <input type="text" className="form-control" id="validationCustom01" value={name} onChange={(e)=>setName(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-auto">
              <label htmlFor="validationCustom02" className="form-label">Dosage</label>
              <input type="text" className="form-control" id="validationCustom02" value={dosage} onChange={(e)=>setDosage(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            {/*<div className="col-md-4">
              <label htmlFor="validationCustomUsername" className="form-label">Frequency</label>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" onChange={(e)=>setFrequency(e.target.value)} required />
                <div className="valid-feedback">
                  Please choose a username.
              </div>
            </div>*/}
            <div className="col-auto">
              <label className="form-label" htmlFor="autoSizingSelect">Frequency</label>
              <select className="form-select" id="autoSizingSelect" value={frequency}  onChange={(e)=>setFrequency(e.target.value)}>
                <option muted>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
        </div>
    </Wrapper>
  );
}
