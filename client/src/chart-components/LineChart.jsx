import React from 'react'
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";

function LineChart({param1, param2}) {

  Chart.register(...registerables);

  const data = {
    labels: param1,
    datasets: [
      {
        label: "Intensity",
        data: param2,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRation: 2,
    plugins: {
      title: {
        display: true,
        text: '',
        font: {
          size: 20
        }
      },
      legend: {
        display: false,
        position: 'right'
      },
      tooltip: {
        mode: 'index',
        intersect: true
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: false,
          text: 'Year'
        }
      },
      y: {
        display: true,
        title: {
          display: false,
          text: 'Intensity'
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    elements: {
      point: {
        radius: 5,
        borderWidth: 7,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)'
      },
      line: {
        tension: 0.4,
        borderWidth: 6,
        borderColor: '#0E46A3',
        backgroundColor: '#0E46A3'
      }
    }
  };


  return (
    <Line options={options} data={data} />
  )
}

export default LineChart