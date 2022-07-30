import React,{useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import Wrapper from '../../component/Wrapper';
import axios from 'axios';
import {toast} from 'react-toastify';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import AddMedicineModal from '../modal/addMedicine.Modal';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Reports = () => {

  const [medications,setMedicines] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loader,setLoader] = useState(false);
  const [nodata, setNodata] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (
      async () => {
        setLoader(true);
        const {data} = await axios.get(`reports?page=${page}`,{withCredentials:true});
        setTimeout(() => {
          setLoader(false)
        },3000);
        console.log(data);
        const datas = data.data;
          if(datas.length === 0){
            setNodata(true)
          };
          setMedicines(datas);
          setLastPage(data.meta.last_page);
      }
    )();
  }, [page]);

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      const  {data} = await axios.delete(`deletemedicine/${id}`,{withCredentials:true});
      setMedicines(medications.filter((medication) => medication._id !== id));
      if(data.msg === 'success'){
        toast.success(data.msg)
      }
    }
  };

  const prev = ()=>{
    if(page > 1){
      setPage(page - 1)
    }
  };
  const next = ()=>{
    if(page < lastPage){
      setPage(page + 1)
    }
  };

  return (
    <Wrapper>
      {
        loader ?
          <div style={style}>
            <PuffLoader size={40} color={'#F37A24'} css={override} loading={loader} />
          </div>
        :(
          nodata ?
            <div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className='h2 text-muted'>Medication</h1>
            </div>
          
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <div className="btn-toolbar mb-2 mb-md-0">
			  {/*<button type='button' className="btn btn-sm btn-outline-secondary" onClick={()=>setModalShow(true)}>Add</button>*/}
                <Link to={'/medicine/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
              </div>
              <AddMedicineModal show={modalShow} onHide={()=>setModalShow(false)}/>
            </div>
              <div className="table-responsive">
                <div className="table table-striped table-sm">
                  <p>No data has been found at the moment</p>
                </div>
              </div>
          </div>
          :
        <div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className='h2 text-muted'>Medication</h1>
          </div>
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <div className="btn-toolbar mb-2 mb-md-0">
			  {/*<button type='button' className="btn btn-sm btn-outline-secondary" onClick={() => setModalShow(true)}>Add</button>*/}
                <Link to={'/medicine/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
              </div>
              <AddMedicineModal show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                      <tr className="justify-content-center text-center">
                      <th scope="col">#</th>
                      <th scope="col">Medication Name</th>
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
                                  <Link to={`/medicine/${medication._id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                  <div className='ml-5' style={{marginLeft: '5px'}}>
                                    <a href="#!" rel="noreffere" className="btn btn-sm btn-outline-danger" onClick={()=>del(medication._id)}>Delete</a>
                                  </div>
                                  {/*<div className='ml-5' style={{marginLeft: '5px'}}>
                                    <Link to={`/medicine/${medication._id}`} className="btn btn-sm btn-outline-secondary">Download</Link>
                                  </div>*/}
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                </table>
              </div>

              <nav className="mt-3">
                <ul className='pagination'>
                  <li className='page-item'>
                    <a href='#!' rel="noreffere" className='page-link' onClick={()=>prev()}><FiChevronLeft /> Previous</a> 
                  </li>
                  <li className='page-item'>
                    <a href='#!' rel="noreffere" className='page-link' onClick={()=>next()}>Next <FiChevronRight /></a> 
                  </li>
                </ul>
              </nav>
          </div>
        )
      }
    </Wrapper>
  )
}

export default Reports;

const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };