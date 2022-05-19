import React,{useState} from 'react';
import Wrapper from '../component/Wrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
import momentTimeZone from 'moment-timezone';
import DatePicker from "react-datepicker"; 
import "./medicine.css";
import "react-datepicker/dist/react-datepicker.css"

export default function NewMedicine() {

  const [name,setName]= useState('');
  /*const [names,setNames]= useState('');*/
  const [dosage,setDosage]= useState(0);
  const [frequency,setFrequency]= useState(0);
  const [timeZone,setTimeZone] = useState('');
  const [notification,setNotification] = useState(new Date());
  
  const [values, ] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [selectedDate, setselectedDate] = useState(null);

  const dateFormatAux = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    
    return [year, month, day].join('-');
  }

  const dateFormat = (date) => {
    let formatYearMonthDay = dateFormatAux(date);
    //console.log(formatYearMonthDay);
    let formatISO8601 = new Date(date).toISOString();
    //console.log(formatISO8601);
    return [formatYearMonthDay, formatISO8601];
  }
  
  const getTimeZones = function() {
    return momentTimeZone.tz.names();
  };
  const timeZones = getTimeZones()
  const Meds = async (e)=>{
    e.preventDefault();
    let birthDateYMD, birthDateISO8601;
      if (selectedDate != null)
        [birthDateYMD, birthDateISO8601] = dateFormat(selectedDate);
      if(values.firstName && values.lastName && values.email)
        setValid(true)
      setSubmitted(true);
      let formData = {
        birthDate: selectedDate,
        birthDateFmtYMD: birthDateYMD,
        birthDateFmtISO8601: birthDateISO8601,
      };
      console.log(formData);
      //console.log(`Selected dates are: ${selectedDate}`)

    if (!name || !dosage || !frequency) return;
    const medicine = { name, dosage, frequency, timeZone, birthDateISO8601, notification };
      const {data} = await axios.post('addmedicine',medicine,{withCredentials:true});
      if(data.msg === 'success'){ toast.success("success data")}
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2 text-muted'>Record Medication</h1>
      </div>
      <div className='form-container'>
          <form className="row g-3" onSubmit={Meds}>
            {submitted && valid ? <div className="success-message">Success! Thank you for registering</div> : null }
            <div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">Medicine name</label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="Medicine Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            {/*<div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">Medicine names</label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="Medicine Name" value={names} onChange={(e)=>setNames(e.target.value)} required />
            </div>*/}
            
            <div className="row g-3">
              <div className="col-md-1 mb-1">
                <label htmlFor="validationCustom02" className="form-label">Dosage</label>
                <input type="number" className="form-field" min={0} max={4} id="validationCustom02" value={dosage} onChange={(e)=>setDosage(e.target.value)} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-1 mb-1">
                <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
                <input type={'number'} className="form-field" min={0} max={3} id="autoSizingSelect" value={frequency}  onChange={(e)=>setFrequency(e.target.value)} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>

              <div className='col-auto'>
              <label htmlFor="inputState" className="form-label">State</label>
                <select id="inputState" className="form-field" name="time" onChange={(e)=>setTimeZone(e.target.value)} style={{background: '#f2f2f2'}}>
                  {
                    timeZones.map((timeZone, i)=>{
                      return <option value={timeZone} key={i}>{timeZone}</option>
                    })
                  }
                </select>
            </div>
            <div className='col-auto'>
              <label htmlFor='' className='form-label'>Notifications</label>
              <select name='notification' className="form-field" onChange={(e)=>setNotification(e.target.value)} style={{background: '#f2f2f2'}}>
                <option value='' diasbled='true'>Select a time</option> 
                <option value='15'> 15 Minutes</option>
                <option value='30'> 30 Minutes</option>
                <option value='45'> 45 Minutes</option>
                <option value='60'> 60 Minutes</option>
              </select>
            </div>

            <div className='col-auto'>
            <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
              <DatePicker 
                selected={selectedDate} 
                onChange={date => setselectedDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy"
                className="form-field"
                id="birthDate notifyDate"
                placeholderText="Notification Date"
                //minDate={new Date()}
              />
              { submitted && !selectedDate ? <span id="email-error">Please enter an birthdate</span> : null }
            </div>

            </div>

            {/*<div className='col-auto'>
              <label htmlFor="inputState" className="form-label">State</label>
                <select id="inputState" className="form-field" name="time" onChange={(e)=>setTimeZone(e.target.value)} style={{background: '#f2f2f2'}}>
                  {
                    timeZones.map((timeZone, i)=>{
                      return <option value={timeZone} key={i}>{timeZone}</option>
                    })
                  }
                </select>
            </div>
            <div className='col-auto'>
              <label htmlFor='' className='form-label'>Notifications</label>
              <select name='notification' className="form-field" onChange={(e)=>setNotification(e.target.value)} style={{background: '#f2f2f2'}}>
                <option value='' diasbled='true'>Select a time</option> 
                <option value='15'> 15 Minutes</option>
                <option value='30'> 30 Minutes</option>
                <option value='45'> 45 Minutes</option>
                <option value='60'> 60 Minutes</option>
              </select>
            </div>

            <div className='col-auto'>
            <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
              <DatePicker 
                selected={selectedDate} 
                onChange={date => setselectedDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy"
                className="form-field"
                id="birthDate notifyDate"
                placeholderText="Notification Date"
                //minDate={new Date()}
              />
              { submitted && !selectedDate ? <span id="email-error">Please enter an birthdate</span> : null }
            </div>*/}

            <div className="col-12">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
    </Wrapper>
  );
}
