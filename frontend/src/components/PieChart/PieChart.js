import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './PieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({share}) => {
  const data = {
    labels: ['Bitcoin', 'Other cryptos'],
    datasets: [
      {
        label: 'Market Share',
        data: [share, 100 - share],
        backgroundColor: [
          ' rgba(255, 174, 0, 0.8)',
          'rgba(255, 255, 255, 0.3)',
        ],
        borderColor: [
          ' rgb(255, 174, 0)',
          'rgba(255, 255, 255, 0.4)',
        ],
        borderWidth: 2,
      },
    ],
  }
  return (
    <div className="pie-chart">
        <Doughnut data={data} />
    </div>
  )
}

export default PieChart