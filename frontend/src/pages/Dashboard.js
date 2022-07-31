import React from 'react';
import Wrapper from '../component/Wrapper';
import {Calendar} from 'react-feather';
import './Dashboard.css';
//import Graph from './Graph';

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
      {/*<Graph className="my-4 w-100" style={{width:"900",height:"180"}} />*/}
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Medicine Tracking App</h1>
          <p className="col-md-8 fs-4">This is a simple application that reminds people about thier Medice intake. Uses Twilio API and SendGrid API to send SMS and Emails.
          In order to start enter ant Medication records in Medication section.
          </p>
          <button className="btn btn-primary btn-lg" type="button" href="https://unsplash.com" target="_blank">Learn more</button>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard
