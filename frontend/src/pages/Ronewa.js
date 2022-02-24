import React from 'react';
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March','April', 'May','June','Jully'],
  //labels: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  datasets: [
    {
      label: 'Regitered Medicine',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 60, 70]
    },
    {
      label: 'Mavhungu',
      data: [39, 45, 80, 03, 89, 42, 34],
      lineTension: 0.5,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }
  ]
}

export default class Ronewa extends React.Component {
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}