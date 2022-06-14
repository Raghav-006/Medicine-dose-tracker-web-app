import React from 'react';
import {Modal,Button} from 'react-bootstrap'
import {useForm, Controller} from 'react-hook-form';
import momentTimeZone from 'moment-timezone';
import moment from 'moment';
import axios from 'axios';
//import { TextField, Checkbox } from "@material-ui/core";

export default function EditMedicineModal(props) {
  moment.locale();
  moment().format();
  const {register, handleSubmit, control, reset, formState: { errors }} = useForm({
    defaultValue: {
    checkbox: true,
    ronewa: props.editmeds.dosage
  }
});
const editTime = moment(props.editmeds.time).format('yyyy-MM-DDTHH:mm');
const getTimeZones = function() {
  return momentTimeZone.tz.names();
};
const timeZones = getTimeZones();

  const savemodals = async (datas, e)=>{
    //e.preventDefault();
    console.log(datas);
    await e.target.reset();
    //const {data} = await axios.post('modaladdmedicine',datas,{withCredentials:true});
    await props.onHide(false)
  };

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal headings Mavhungu
            </Modal.Title>
        </Modal.Header>
          <form className="bg-white  rounded-5 shadow-5-strong p-5" onSubmit={handleSubmit(savemodals)}>
            <Modal.Body>
              <input className='form-control d-none' type='text' value={props.editmeds._id} {...register('id',{required:true})}  />
                <div className="form-row"> 
                  <input className='form-control' type='text' maxLength={30} {...register('name',{required:true, maxLength: 30})} placeholder={'Medication name'} value={props.editmeds.name}/>
                  {errors.medName && <span style={{color:'red'}}>Medication name is required</span>}
                </div>
                <div className='row g-3'>
                  <div className="col-md-2">
                    <label htmlFor="validationDosage" className="form-label">Dosage</label>
                      <input className='form-field' id="validationDosage" type='number' max={3} min={0} {...register('dosage')} defaultValue={props.editmeds.dosage} />
                    </div>
                  <div className='col-md-2'>
                    <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
                      <input className='form-field' type='number' id="autoSizingSelect" min={0} max={3} {...register('frequency',{ min:0, max:3})} defaultValue={props.editmeds.frequency} />
                  </div>
                  <div className='col-auto'>
                    <label htmlFor='' className='form-label'>Notifications</label>
                    <Controller
                      control={control}
                        render={()=>
                          <select className="form-control" {...register('notification',{required:true})} >
                            <option value={props.editmeds.notification}>{props.editmeds.notification} Minutes</option>
                            <option value='15'> 15 Minutes</option>
                            <option value='30'> 30 Minutes</option>
                            <option value='45'> 45 Minutes</option>
                            <option value='60'> 60 Minutes</option>
                          </select>}
                    />
                  </div>
                </div>
                {/*<input className={'form-control'} {...register('name',{required:true})} />*/}
                {/*{errors.name && <span style={{color:'red'}}>Password is required</span>}*/}

                  <div className='col-auto'>
                    <label htmlFor="inputState" className="form-label">TimeZone</label>
                      <select id="inputState" className="form-control" {...register('timeZone',{required:true})} style={{background: '#f2f2f2'}} >
                        <option value={props.editmeds.timeZone}>{props.editmeds.timeZone}</option>
                        {
                          timeZones.map((timeZone, i)=>{
                            return <option value={timeZone} key={i}>{timeZone}</option>
                          })
                        }
                      </select>
                  </div>
                    <div className="col-auto">
                      <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
                        <input type="datetime-local" className="form-control" value={editTime} id="nofifyDate" {...register('notifyTime',{required:true})} />
                    </div>
            </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                  <Button type='submit' className="btn btn-primary">Save</Button>
                    <input style={{ display: "block", marginTop: 20 }} type="button" className="d-none" onClick={() => reset()} />
              </Modal.Footer>
          </form>
      </Modal>
    </>
  );
}