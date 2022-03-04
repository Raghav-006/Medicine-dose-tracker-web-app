import React from 'react';
import {Modal,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

export default function AddMedicineModal(props) {
    const {register,handleSubmit,reset,formState:{errors}} = useForm();

    const savemodal = (data,e)=>{
        //e.preventDefault();
        e.target.reset();
        console.log('Tap');
        console.log(data.name)
        props.onHide(false)
    
      }

  return (
    <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(savemodal)}>
        <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
            </p>
            <input {...register('name',{required:true})} />
            {errors.name && <span style={{color:'red'}}>Password is required</span>}
        </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button type='submit'>Save</Button>
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
