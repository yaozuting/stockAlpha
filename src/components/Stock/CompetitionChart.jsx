import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Title);

export default function FinancialChart({ graph_text, showData }) {
  // Get all company names (keys except "date")
  const companyNames = Object.keys(showData[0]).filter(key => key !== "date");

  const chartData = {
    labels: showData.map(item => item.date), // x-axis
    datasets: companyNames.map((name, idx) => ({
      label: name,
      data: showData.map(item => item[name] ?? null),
      fill: false,
      borderColor: ['#f44336', '#4caf50', '#2196f3', '#ff9800'][idx % 4], // color per series
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      spanGaps: true, // ✅ add this line!
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: false,
        text: graph_text,
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const val = context.parsed.y;
            return `${context.dataset.label}: ${val?.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => value.toLocaleString()
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
