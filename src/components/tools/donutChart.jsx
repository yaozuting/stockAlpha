// DonutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#28a745', // Green
          '#6c757d', // Grey
          '#dc3545', // Red
          '#FFD43B', '#646464', '#B3B3B3', '#7FDBCA'
        ],
        hoverBackgroundColor: [
          '#218838', // Darker Green
          '#5a6268', // Darker Grey
          '#c82333', // Darker Red
          '#E6C12D', '#525252', '#9F9F9F', '#6CC4B1'
        ],
        borderWidth: 2,
        borderColor: '#fff',
       
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 13,
            family: 'Segoe UI, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 10,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className='graph'>
       <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
