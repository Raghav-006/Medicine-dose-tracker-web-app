import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March','April', 'May','June','Jully'],
  datasets: [
    {
      label: 'Regitered Medicine',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 65, 60, 70]
    },
    {
      label: 'Unregistered Medication',
      data: [70, 64, 80, 70, 65, 80, 60],
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,3)',
      borderColor: '#007bff',
      borderWidth: 2,
      pointBackgroundColor: '#007bff'
    }
  ]
}

export default class Graph extends React.Component {
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