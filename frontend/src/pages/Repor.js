import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
//import { Form, Button } from "react-bootstrap";
//import PuffLoader from 'react-spinners/PuffLoader';
import momentTimeZone from 'moment-timezone';
import moment from 'moment';
import axios from "axios"
import Wrapper from '../component/Wrapper'
//import { css } from "@emotion/react";

/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/

//const editTime = moment(editmeds.time).format('yyyy-MM-DDTHH:mm');
const getTimeZones = function() {
  return momentTimeZone.tz.names();
};
const timeZones = getTimeZones();

export default function Repor() {
  const {register, handleSubmit, control, formState: { errors }} = useForm();
  const [_id, set_Id] = useState();
  const [ids, setId] = useState();
  const [name, setName] = useState();
  const [dosage,setDosage] = useState();
  const [frequency,setFrequency] = useState();
  const [notification, setNotification] = useState();
  const [time,setTime] = useState();
  const [timeZone,setTimeZone] = useState();

  moment.locale();
  moment().format();
  let { id } = useParams();

  const onSubmit = async (e)=>{
    e.preventDefault(); 
    const Medsa={
      _id,id,name, notification,dosage, frequency, time, timeZone
    }
    console.log("Clicked onSubmit");
    console.log(Medsa);
    //let id = datas._id;
    //await e.target.reset();
    const {data} = await axios.post(`editmedicine/${_id}`,Medsa,{withCredentials:true});
    //await editmeds.onHide(false); 
  };

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`reports/report/${id}/edit`,{withCredentials:true});
        console.log(data);
        set_Id(data.meds._id);
        setId(data.meds.id);
        setName(data.meds.name);
        setDosage(data.meds.dosage);
        setFrequency(data.meds.frequency);
        setNotification(data.meds.notification);
        setTime(moment(data.meds.time).format('yyyy-MM-DDTHH:mm'));
        setTimeZone(data.meds.timeZone);
      }
    )();
  },[]);

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <input className='form-control d-none' type='text' value={_id} /> 
            <div className="form-row">
              <input className='form-control d-none' type='text' value={ids} />
            </div>
        <div className="form-row">
          <input className='form-control' type='text' maxLength={30} id="name" placeholder={'Medication name'} defaultValue={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className='row g-3'>
          <div className="col-md-2">
            <label htmlFor="validationDosage" className="form-label">Dosage</label>
              <input className='form-field' id="validationDosage" type='number' max={3} min={0} onChange={(e)=>setDosage(e.target.value)} defaultValue={dosage} />
          </div>
          <div className='col-md-2'>
            <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
              <input className='form-field' type='number' id="autoSizingSelect" min={0} max={3} onChange={(e)=>setFrequency(e.target.value)} defaultValue={frequency} />
          </div>
          <div className='col-md-4'>
            <label htmlFor='controlSelect' className='form-label'>Notifications</label>
            <Controller
              control={control}
                render={()=>
                  <select className="form-control" id='controlSelect' onChange={(e)=>setNotification(e.target.value)} >
                    <option value={notification}>{notification} Minutes</option>
                    <option value='15'> 15 Minutes</option>
                    <option value='30'> 30 Minutes</option>
                    <option value='45'> 45 Minutes</option>
                    <option value='60'> 60 Minutes</option>
                  </select>}
            />
          </div>
        </div>      
        <div className='col-auto'>
          <label htmlFor="inputState" className="form-label">TimeZone</label>
            <select id="inputState" className="form-control" onChange={(e)=>setTimeZone(e.target.vale)} style={{background: '#f2f2f2'}} >
              <option value={timeZone}>{timeZone}</option>
              {
                timeZones.map((timeZone, i)=>{
                  return <option value={timeZone} key={i}>{timeZone}</option>
                })
              }
            </select>
        </div>
        <div className="col-auto">
          <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
            <input type="datetime-local" className="form-control" defaultValue={time} onChange={(e)=>setTime(e.target.value)} id="nofifyDate" />
        </div>
          <input type="submit" className="btn btn-primary" />
      </form>


        {/*<form className="bg-white  rounded-5 shadow-5-strong p-5" onSubmit={handleSubmit(onSubmit)} >
          <input className='form-control d-none' type='text' value={_id} {...register('_id',{required:true})} /> 
            <div className="form-row">
              <input className='form-control d-none' type='text' value={ids} {...register('id',{required:true})} />
            </div>
            <div className="form-row"> 
              <input className='form-control' type='text' maxLength={30} id="name" aria-invalid={errors.name ? "true" : "false"} {...register('name',{required:true, maxLength: 30})} placeholder={'Medication name'} defaultValue={name} />
                {/*errors.medName && <span style={{color:'red'}}>Medication name is required</span>*/}
                {/* use role="alert" to announce the error message */}
                {/*{errors.name && errors.name.type === "required" && (
                  <span role="alert">Medication name is required</span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                  <span role="alert">Max length exceeded</span>
                )}
            </div>
              <div className='row g-3'>
                <div className="col-md-2">
                  <label htmlFor="validationDosage" className="form-label">Dosage</label>
                    <input className='form-field' id="validationDosage" type='number' aria-invalid={errors.dosage ? "true" : "false"} max={3} min={0} {...register('dosage')} defaultValue={dosage} />
                      {/* use role="alert" to announce the error message */}
                      {/*{errors.dosage && errors.dosage.type === "required" && (
                        <span role="alert">Dosage is required</span>
                      )}
                      {errors.dosage && errors.dosage.type === "maxLength" && (
                        <span role="alert">Max length exceeded</span>
                      )}
                  </div>
                  <div className='col-md-2'>
                    <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
                      <input className='form-field' type='number' id="autoSizingSelect" min={0} max={3} {...register('frequency',{ min:0, max:3})} defaultValue={frequency} />
                  </div>
                  <div className='col-md-4'>
                    <label htmlFor='controlSelect' className='form-label'>Notifications</label>
                    <Controller
                      control={control}
                        render={()=>
                          <select className="form-control" id='controlSelect' {...register('notification',{required:true})} >
                            <option value={notification}>{notification} Minutes</option>
                            <option value='15'> 15 Minutes</option>
                            <option value='30'> 30 Minutes</option>
                            <option value='45'> 45 Minutes</option>
                            <option value='60'> 60 Minutes</option>
                          </select>}
                    />
                  </div>
                </div>
                  <div className='col-auto'>
                    <label htmlFor="inputState" className="form-label">TimeZone</label>
                      <select id="inputState" className="form-control" {...register('timeZone',{required:true})} style={{background: '#f2f2f2'}} >
                        <option value={timeZone}>{timeZone}</option>
                        {
                          timeZones.map((timeZone, i)=>{
                            return <option value={timeZone} key={i}>{timeZone}</option>
                          })
                        }
                      </select>
                  </div>
                    <div className="col-auto">
                      <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
                        <input type="datetime-local" className="form-control" defaultValue={time} id="nofifyDate" {...register('notifyTime',{required:true})} />
                    </div>
                  <div className="col-md-12">
                    <button type='submit' className="btn btn-primary">Save</button>
                  </div>
              <input type="submit"  className="btn btn-primary" /> 
                      </form>*/}
    </Wrapper>
  )
};

//const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
