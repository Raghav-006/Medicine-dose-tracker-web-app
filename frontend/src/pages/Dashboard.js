import React from 'react';
import Wrapper from '../component/Wrapper';
import {Calendar} from 'react-feather';
import {Link} from 'react-router-dom'
import './Dashboard.css';
import Graph from './Graph'


const Dashboard =()=> {

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-muted">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"><Calendar className="feather"/></span>
              This week
            </button>
          </div>
      </div>
      <Graph className="my-4 w-100" style={{width:"900",height:"180"}} />

      <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <td>1,001</td>
                        <td>random</td>
                        <td>data</td>
                        <td>placeholder</td>
                        <td>
                            <div className="btn-group mr-2">
                                <Link to={`/admin/products/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                <Link to={'/delete'} className="btn btn-sm btn-outline-secondary">Delete</Link>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        </tr>
                    </tbody>
            </table>
        </div>


    </Wrapper>
  )
}

export default Dashboard
