import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "./common/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ runs }) {
  const success = runs.filter((r) => r.status === "SUCCESS").length;
  const fail = runs.length - success;

  const data = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        data: [success, fail],
        backgroundColor: ["#34d399", "#fb7185"],
        borderColor: "#131e33",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#8b98b3" } },
      title: {
        display: true,
        text: "Success vs Failure",
        color: "#e6edf7",
        font: { family: "Space Grotesk", size: 14 },
      },
    },
  };

  return (
    <Card className="chart-card">
      <div className="chart-wrap">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
}

export default StatusChart;