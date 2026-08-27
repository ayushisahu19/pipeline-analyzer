import React from "react";

function StatsCards({ runs }) {

  const totalRuns = runs.length;

  const success = runs.filter(r => r.status === "SUCCESS").length;

  const successRate =
    totalRuns === 0 ? 0 : ((success / totalRuns) * 100).toFixed(1);

  const avgBuild =
    totalRuns === 0
      ? 0
      : (runs.reduce((sum, r) => sum + r.buildTime, 0) / totalRuns).toFixed(1);

  return (
    <div className="cards">

      <div className="card">
        <h3>Total Runs</h3>
        <p>{totalRuns}</p>
      </div>

      <div className="card">
        <h3>Success Rate</h3>
        <p>{successRate}%</p>
      </div>

      <div className="card">
        <h3>Average Build Time</h3>
        <p>{avgBuild} s</p>
      </div>

    </div>
  );
}

export default StatsCards;