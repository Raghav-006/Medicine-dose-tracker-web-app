import React from 'react';
import {Modal,Button} from 'react-bootstrap'
import {useForm, Controller} from 'react-hook-form'
//import { TextField, Checkbox } from "@material-ui/core";

export default function EditMedicineModal(props) {
  const {register, handleSubmit, control, reset, formState: { errors }} = useForm({
    defaultValue: {
    checkbox: true,
    ronewa: props.editmeds.dosage
  }
});
  const savemodal = async (data, e)=>{
    //e.preventDefault();
    console.log(data)
    await e.target.reset();
    await props.onHide(false)
  }

  return (
    <>
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false} >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal headings Mavhungu
              </Modal.Title>
          </Modal.Header>
            <form className="bg-white  rounded-5 shadow-5-strong p-5" onSubmit={handleSubmit(savemodal)}>
              <Modal.Body>
                <input className='form-control d-none' type='text' value={props.editmeds._id} {...register('id',{required:true})}  />
                  <div className="form-row"> 
                    <input className='form-control' type='text' maxLength={30} {...register('medName',{required:true, maxLength: 30})} placeholder={'Medication name'} 
                    value={props.editmeds.name}/>
                    {errors.medName && <span style={{color:'red'}}>Medication name is required</span>}
                  </div>
                    <div className="form-row">
                      <input className='form-field' type='number' max={3} min={0} {...register('dosage')} defaultValue={props.editmeds.frequency} />
                    </div>
                  <div className='form-row'>
                      <input className='form-field' type='number' min={0} max={3} {...register('frequency',{ min:0, max:3})} defaultValue={props.editmeds.frequency} />
                  </div>
                  {/*<Controller
                    name="ronewa"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField {...field} className='form-field' />}
                    />
                  <Controller
                    name="checkbox"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Checkbox {...field} />}
                  />*/}
                  <div className='form-row'>
                  <Controller
                  control={control}
                  render={()=>
                    <select className="form-control" {...register('Notification',{required:true})} >
                      <option value={props.editmeds.notification}>{props.editmeds.notification} Minutes</option>
                      <option value='15'> 15 Minutes</option>
                      <option value='30'> 30 Minutes</option>
                      <option value='45'> 45 Minutes</option>
                      <option value='60'> 60 Minutes</option>
                    </select>}
                  />
                  </div>
                  {/*<input className={'form-control'} {...register('name',{required:true})} />*/}
                  {/*{errors.name && <span style={{color:'red'}}>Password is required</span>}*/}
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
        </Modal>
    </>
  );
}