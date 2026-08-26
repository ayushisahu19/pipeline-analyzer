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
import Card from "./common/Card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BuildChart({ runs }) {
  const branches = [...new Set(runs.map((r) => r.branch))];

  const avgBuildTimes = branches.map((branch) => {
    const branchRuns = runs.filter((r) => r.branch === branch);
    const avg =
      branchRuns.reduce((sum, r) => sum + r.buildTime, 0) / branchRuns.length;
    return avg.toFixed(0);
  });

  const data = {
    labels: branches,
    datasets: [
      {
        label: "Average Build Time (ms)",
        data: avgBuildTimes,
        backgroundColor: "#2dd4bf",
        borderRadius: 4,
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
        text: "Average Build Time by Branch",
        color: "#e6edf7",
        font: { family: "Space Grotesk", size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#8b98b3", maxRotation: 30, minRotation: 30 },
        grid: { color: "#22314a" },
      },
      y: {
        ticks: { color: "#8b98b3" },
        grid: { color: "#22314a" },
      },
    },
  };

  return (
    <Card className="chart-card">
      <div className="chart-wrap">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

export default BuildChart;