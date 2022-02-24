import React from 'react';
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March','April', 'May','June','Jully'],
  datasets: [{
      label: 'Regitered Medicine',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56,60,70]
    }]
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