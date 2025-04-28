import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialChart = ({graph_text, showData }) => {
  if (!showData || !Array.isArray(showData) || showData.length === 0) {
    return <p>No item was selected</p>;
  }

  // Step 1: Collect all unique dates across all series
  const allDates = Array.from(
    new Set(showData.flatMap(series => series.dates))
  ).sort((a, b) =>
    new Date(a.split('-').reverse().join('/')) - new Date(b.split('-').reverse().join('/'))
  );

  // Step 2: Create datasets
  const colorPalette = [
    "#2563eb", "#10b981", "#f97316", "#6366f1", "#ec4899", "#14b8a6",
    "#ef4444", "#8b5cf6", "#facc15", "#22c55e"
  ];

  const datasets = showData.map((series, index) => {
    const dataAlignedToDates = allDates.map(date => {
      const i = series.dates.indexOf(date);
      return i !== -1 ? series.values[i] : null;
    });

    return {
      label: series.name,
      data: dataAlignedToDates,
      borderColor: colorPalette[index % colorPalette.length],
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: colorPalette[index % colorPalette.length],
      pointBorderColor: "#fff",
      fill: false,
    };
  });

  const data = {
    labels: allDates,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Adjusted to allow dynamic resizing
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 10,
          font: {
            size: 14,
            family: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
          },
          color: "#333",
        },
      },
      title: {
        display: true, 
        value: graph_text,
        font: {
          size: 18,
          weight: "bold",
          family: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
        },
        padding:0,
        margin :0// Disable the chart title
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#111827",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        title: {
          display: true,
          text: "Date",
          color: "#374151",
          font: { size: 14, weight: "600" },
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
          callback: function (value) {
            return Intl.NumberFormat("en", { notation: "compact" }).format(value);
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        title: {
          display: true,
          text: "Value",
          color: "#374151",
          font: { size: 14, weight: "600" },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default FinancialChart;
