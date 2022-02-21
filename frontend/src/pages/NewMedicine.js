import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
//import {useForm} from 'react-hook-form'

export default function NewMedicine() {
  //const {register,handleSubmit,reset,formState:{errors}} = useForm();
  const [name,setName]= useState('')
  const [dosage,setDosage]= useState(0)
  const [frequency,setFrequency]= useState(0)

  const Meds = async (e)=>{
    e.preventDefault();
    if (!name || !dosage || !frequency) return;
    const medicine = { name, dosage, frequency };
    console.log(medicine)
      //const {data} = await axios.post('addmedicine',medicine,{withCredentials:true});
      const {data} = await axios.post('addmedicine',medicine,{withCredentials:true});
      //if(data.msg === 'tttt'){ toast.success("success data")}
      
      //console.log(data)
    
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
              <input type="number" className="form-control" id="validationCustom02" value={dosage} onChange={(e)=>setDosage(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-auto">
              <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
              <input type={'number'} className="form-control" id="autoSizingSelect" value={frequency}  onChange={(e)=>setFrequency(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
    </Wrapper>
  );
}
