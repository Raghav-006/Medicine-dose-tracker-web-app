import React,{useEffect,useState} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import momentTimeZone from 'moment-timezone';
import moment from 'moment';
//import DatePicker from 'react-datepicker';
import axios from "axios"
import { toast } from 'react-toastify';
import Wrapper from '../../component/Wrapper'

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};
const timeZones = getTimeZones();

export default function MedicineEdit() {

  const navigate = useNavigate();
  const [_id, set_Id] = useState("");
  const [ids, setId] = useState("");
  const [name, setName] = useState();
  const [dosage,setDosage] = useState("");
  const [frequency,setFrequency] = useState("");
  const [notification, setNotification] = useState("");
  const [time,setTime] = useState("");
  const [timeZone,setTimeZone] = useState("");

  moment.locale();
  moment().format();
  let { id } = useParams();

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
    let Medsa={
      _id, ids, name, notification, dosage, frequency, timeZone, time
    };
    console.log(time);
    await axios.put(`reportupdate/${id}`,Medsa,{withCredentials:true})
    .then( res => {
      //alert('Updated successfully!');
      toast.success("success data");
      setTimeout(()=>{
        navigate("/medicine");
      },5000)
    }).catch(err => {
      //alert('An error occurred! Try submitting the form again.');
      toast.warning("An error occurred! Try again");
    });
  };
  
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`medicine/${id}/edit`,{withCredentials:true});
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
  },[id]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input className='form-control d-none' type='text' value={_id} onChange={(e)=>set_Id(e.target.value)} />
          <div className="form-row">
            <input className='form-control d-none' type='text' value={ids} onChange={(e)=>setId(e.target.value)} />
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
              <select className="form-control" id='controlSelect' onChange={(e)=>setNotification(e.target.value)} >
                <option value={notification} defaultValue={notification}>{notification} Minutes</option>
                <option value='15'> 15 Minutes</option>
                <option value='30'> 30 Minutes</option>
                <option value='45'> 45 Minutes</option>
                <option value='60'> 60 Minutes</option>
              </select>
          </div>
        </div>      
        <div className='col-auto'>
          <label htmlFor="inputState" className="form-label">TimeZone</label>
            <select id="inputState" className="form-control" onChange={(e)=>setTimeZone(e.target.value)} style={{background: '#f2f2f2'}} >
              <option value={timeZone} defaultValue={timeZone}>{timeZone}</option>
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
          <input type="submit" className="btn btn-primary mt-5" />
      </form>

    </Wrapper>
  )
};
