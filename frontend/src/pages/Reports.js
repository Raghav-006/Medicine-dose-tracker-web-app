import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Wrapper from '../component/Wrapper';
import axios from 'axios'


const Reports = ()=>{
  const [medications,setMedicines]= useState([]);

  useEffect(() => {
      (
        async () => {
        const {data} = await axios.get('reports',{withCredentials:true});
        const datas = data.medication;
          setMedicines(datas)
    })();
  }, []);

  console.log(medications)
  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className='h2 text-muted'>Medication</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Mdedication Name</th>
              <th scope="col">Dosage </th>
              <th scope="col">frequency / day</th>
              <th scope="col">Action</th>
              </tr>
          </thead>
            <tbody>
              {medications.map(
                (medication)=>{
                  return (
                    <tr key={medication._id}>
                      <td>{medication.id}</td>
                      <td>{medication.name}</td>
                      <td>{medication.dosage}</td>
                      <td>{medication.frequency}</td>
                      <td>
                        <div className="btn-group mr-2">
                          <Link to={`/admin/products/${medication._id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                          <Link to="#!" className="btn btn-sm btn-outline-secondary">Delete</Link>
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