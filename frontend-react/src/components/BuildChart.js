// // frontend-react/src/components/BuildChart.js
// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // register plugins / scales at module top-level
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function BuildChart({ labels = [], datasets = [] }) {
//   const data = { labels, datasets };
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Build time by branch" },
//     },
//   };

//   return (
//     <div style={{ width: "100%", height: "300px" }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// }

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BuildChart({ runs }) {

  const branches = [...new Set(runs.map(r => r.branch))];

  const avgBuildTimes = branches.map(branch => {
    const branchRuns = runs.filter(r => r.branch === branch);
    const avg =
      branchRuns.reduce((sum, r) => sum + r.buildTime, 0) / branchRuns.length;

    return avg.toFixed(0);
  });

  const data = {
    labels: branches,
    datasets: [
      {
        label: "Average Build Time",
        data: avgBuildTimes,
        backgroundColor: "#007bff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Average Build Time by Branch" },
    },
  };

  return (
    <div className="chart">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BuildChart;