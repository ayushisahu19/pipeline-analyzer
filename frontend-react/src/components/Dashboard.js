import React, { useEffect, useState } from "react";
import { getRuns } from "../services/api";

import StatsCards from "./StatsCards";
import BuildChart from "./BuildChart";
import StatusChart from "./StatusChart";
import RunsTable from "./RunsTable";

function Dashboard() {
  const [runs, setRuns] = useState([]);

  const loadData = async () => {
    try {
      const res = await getRuns();
      setRuns(res.data);
    } catch (err) {
      console.error("Failed to load data:", err.message);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  // When a run gets diagnosed via the modal, patch it into local state
  // immediately instead of waiting for the next 10s poll.
  const handleRunUpdated = (updatedRun) => {
    setRuns((prev) =>
      prev.map((r) => (r._id === updatedRun._id ? updatedRun : r))
    );
  };

  return (
    <div className="dashboard">
      <StatsCards runs={runs} />

      <div className="charts">
        <BuildChart runs={runs} />
        <StatusChart runs={runs} />
      </div>

      <RunsTable runs={runs} onRunUpdated={handleRunUpdated} />
    </div>
  );
}

export default Dashboard;