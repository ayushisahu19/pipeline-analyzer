import React from "react";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);
import { Line } from "react-chartjs-2";

function BuildChart({ runs }) {

  const data = {
    labels: runs.map((_, i) => "Run " + (i + 1)),

    datasets: [
      {
        label: "Build Time",
        data: runs.map(r => r.buildTime),
        borderColor: "blue",
        fill: false
      }
    ]
  };

  return (
    <div className="chart">
      <h3>Build Time Trend</h3>
      <Line data={data} />
    </div>
  );
}

export default BuildChart;