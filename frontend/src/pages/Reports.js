import React,{useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import Wrapper from '../component/Wrapper';
import axios from 'axios'
import {toast} from 'react-toastify'
import AddMedicineModal from './modal/addMedicine.Modal';

const Reports = ()=>{
  const [medications,setMedicines]= useState([]);
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    (
      async () => {
      const {data} = await axios.get('reports',{withCredentials:true}); 
      const datas = data.medication;
        setMedicines(datas)
      }
    )();
  }, []);

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      const  {data} = await axios.delete(`deletemedicine/${id}`,{withCredentials:true});

      setMedicines(medications.filter((medication) => medication._id !== id));
      if(data.msg === 'success'){
        toast.success(data.msg)
      }
    }
  };

  const edits = async (id)=>{
   // await axios.get(`reports/${id}/edit`,{withCredentials:true})
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2 text-muted'>Medication</h1>
      </div>

      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type='button' className="btn btn-sm btn-outline-secondary" onClick={() => setModalShow(true)}>Add</button>
        </div>

        <AddMedicineModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
              <tr className="justify-content-center text-center">
              <th scope="col">#</th>
              <th scope="col">Mdedication Name</th>
              <th scope="col">Dosage </th>
              <th scope="col">frequency / day</th>
              <th scope="col">Notification Time</th>
              <th scope="col">Action</th>
              </tr>
          </thead>
            <tbody>
              {medications.map(
                (medication)=>{
                  return (
                    <tr key={medication._id} className="justify-content-center text-center">
                      <td><input type='checkbox'/></td>
                      <td>{medication.name}</td>
                      <td>{medication.dosage}</td>
                      <td>{medication.frequency}</td>
                      <td className="justify-content-center text-center">{medication.notification} min</td>
                      <td className="justify-content-center text-center">
                        <div className="btn-group">
                          {/*<a href={`/reports/${medication._id}/edit`} rel="noreffere" className="btn btn-sm btn-outline-secondary">Edit</a>*/}
                          <a href='#!' rel="noreffere" className="btn btn-sm btn-outline-secondary" onClick={()=>edits(medication._id)}>Edit</a>
                          <div className='ml-5' style={{marginLeft: '5px'}}>
                            <a href="#!" rel="noreffere" className="btn btn-sm btn-outline-secondary" onClick={()=>del(medication._id)}>Delete</a>
                          </div>
                            <div className='ml-5' style={{marginLeft: '5px'}}>
                              <Link to={`/reports/report`}  className="btn btn-sm btn-outline-secondary">check report</Link>
                            </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Reports