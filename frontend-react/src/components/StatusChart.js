import React from "react";
import { Pie } from "react-chartjs-2";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function StatusChart({ runs }) {

  const success = runs.filter(r => r.status === "SUCCESS").length;
  const fail = runs.length - success;

  const data = {
    labels: ["Success", "Failure"],

    datasets: [
      {
        data: [success, fail],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  return (
    <div className="chart">
      <h3>Success vs Failure</h3>
      <Pie data={data} />
    </div>
  );
}

export default StatusChart;