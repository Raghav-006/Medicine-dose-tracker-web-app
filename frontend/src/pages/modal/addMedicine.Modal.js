import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import TimezoneSelect from 'react-timezone-select'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function AddMedicineModal(props) {
    const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const {register, handleSubmit, reset, formState: { errors }} = useForm(); 

    const savemodal = async (datas, e)=>{
        //e.preventDefault();
        await e.target.reset();
        const {data} = await axios.post('modaladdmedicine',datas,{withCredentials:true});
        await props.onHide(false);
        if(data.msg === 'success'){ toast.success("success data")}
    }

  return (
    <>
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false} >
        <div className='form-container'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="row px-5">
                    New Medicine Record
                </Modal.Title>
            </Modal.Header>
                <form className="bg-white rounded-5 shadow-5-strong p-5" onSubmit={handleSubmit(savemodal)}>
                    <Modal.Body>
                        <input className='form-control' type='text' maxLength={20} {...register('name',{required:true, maxLength: 20})} placeholder={'Medication name'} />
                        {errors.medName && <span style={{color:'red'}}>Medication name is required</span>}
                        
                        <div className='row g-3'>
                            <div className='col-md-2'>
                                <label htmlFor="validationDosage" className="form-label">Dosage</label>
                                <input className='form-field' type='number' id="validationDosage" max={3} min={0} defaultValue={0} {...register('dosage')} placeholder={'Notification'}/>
                            </div>
                            <div className='col-md-2'>
                                <label className="form-label" htmlFor="autoSizingSelect">Frequency / day</label>
                                <input className='form-field' type='number' id="autoSizingSelect" min={0} max={3} defaultValue={0} {...register('frequency',{ min:0, max:3})} placeholder={'Frequency'} />
                            </div>
                        </div>
                        <div className='row g-3'>
                            <div className='col-auto'>
                                <label htmlFor='' className='form-label'>Notifications</label>
                                <select className="form-control" {...register('notification',{required:true})}>
                                    <option value='' muted={true} diasbled={'true'}>Select a time</option> 
                                    <option value='15'> 15 Minutes</option>
                                    <option value='30'> 30 Minutes</option>
                                    <option value='45'> 45 Minutes</option>
                                    <option value='60'> 60 Minutes</option>
                                </select>
                            </div>
                            <div className='col-auto'>
                                <label htmlFor="inputState" className="form-label">TimeZone</label>
                                <input className={'form-control'} defaultValue={selectedTimezone} {...register('timeZone',{required:true})} />
                                {errors.name && <span style={{color:'red'}}>Password is required</span>}
                            </div>
                            <div className="col-auto">
                            <label htmlFor='notifyDate' className='form-label'>Notification Date</label>
                                <input type="datetime-local" className="form-control" id="nofifyDate" {...register('notifyTime',{required:true})} />
                            </div>
                        </div>
                        <div className='form-row'>
                        </div>
                        {/*<div className='form-row'>
                            <TimezoneSelect className='form-control' value={selectedTimezone} onChange={()=>setSelectedTimezone()} {...register('timezone',{required:true})} />
                        </div>*/}
                        
                    </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={props.onHide}>Close</Button>
                            <Button type='submit' className="btn btn-primary">Save</Button>
                            <input
                                style={{ display: "block", marginTop: 20 }}
                                type="button"
                                className="d-none"
                                onClick={() => reset()}
                            />
                        </Modal.Footer>
                </form>
                </div>
        </Modal>
    </>
  );
}
