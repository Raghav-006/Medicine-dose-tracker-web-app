import React from 'react';
import Wrapper from '../component/Wrapper';
import './Dashboard.css';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

const Dashboard =()=> {
  const ctx = document.getElementById('myChart');
  {/*const ctx = document.getElementById('myChart').getContext('2d');
  const ctx = $('#myChart');
const ctx = 'myChart';*/}

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      onClick: (e) => {
        const canvasPosition = getRelativePosition(e, chart);
  
        // Substitute the appropriate scale IDs
        //const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
        //const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
      }
    }
  });

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
              <span data-feather="calendar"></span>
              This week
            </button>
          </div>
      </div>
      <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
    </Wrapper>
  )
}

export default Dashboard
