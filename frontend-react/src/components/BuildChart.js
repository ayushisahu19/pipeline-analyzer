// frontend-react/src/components/BuildChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// register plugins / scales at module top-level
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BuildChart({ labels = [], datasets = [] }) {
  const data = { labels, datasets };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Build time by branch" },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}