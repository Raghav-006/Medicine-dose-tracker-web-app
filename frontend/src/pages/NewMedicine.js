import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
import momentTimeZone from 'moment-timezone';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
//import moment from 'moment';
//import {useForm} from 'react-hook-form'

export default function NewMedicine() {
  //const {register,handleSubmit,reset,formState:{errors}} = useForm();
  const [name,setName]= useState('')
  const [dosage,setDosage]= useState(0)
  const [frequency,setFrequency]= useState(0)
  const [timeZone,setTimeZone] = useState('')
  const [value, setValue] = useState(new Date('2022-03-01T00:00:00.000Z'))
  const [notification,setNotification] = useState()
  
  const getTimeZones = function() {
    return momentTimeZone.tz.names();
  };
  const timeZones = getTimeZones()

  const Meds = async (e)=>{
    e.preventDefault();
    if (!name || !dosage || !frequency) return;
    const medicine = { name, dosage, frequency, timeZone, value, notification };
      const {data} = await axios.post('addmedicine',medicine,{withCredentials:true});
      console.log(data)
      if(data.msg === 'success'){ toast.success("success data")}
    
  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2 text-muted'>Enter new forms</h1>
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
              <input type="number" className="form-control" min={0} max={4} id="validationCustom02" value={dosage} onChange={(e)=>setDosage(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-auto">
              <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
              <input type={'number'} className="form-control" min={0} max={3} id="autoSizingSelect" value={frequency}  onChange={(e)=>setFrequency(e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>


            <div className='col-auto'>
              <label htmlFor="inputState" className="form-label">State</label>
                <select id="inputState" className="form-select" name="time" onChange={(e)=>setTimeZone(e.target.value)}>
                  {
                    timeZones.map((timeZone, i)=>{
                      return <option value={timeZone} key={i}>{timeZone}</option>
                    })
                  }
                </select>
            </div>
            <div className='col-auto'>
              <label htmlFor='' className='form-label'>Notifications</label>
              <input type={'text'} id='' className='form-control' onChange={(e)=>setNotification(e.target.value)} />
            </div>

            <div className='col-auto'>
              <label className='form-label' htmlFor=''></label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TimePicker
                      label="Notification"
                      className='form-control'
                      value={value}
                      onChange={setValue}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
    </Wrapper>
  );
}
