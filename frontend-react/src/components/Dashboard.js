import React, { useEffect, useState } from "react";
import { getRuns } from "../services/api";

import StatsCards from "./StatsCards";
import BuildChart from "./BuildChart";
import StatusChart from "./StatusChart";
import RunsTable from "./RunsTable";

function Dashboard() {

  const [runs, setRuns] = useState([]);

  const loadData = async () => {
    const res = await getRuns();
    setRuns(res.data);
  };

  useEffect(() => {

    loadData();

    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>

      <StatsCards runs={runs} />

      <div className="charts">
        <BuildChart runs={runs} />
        <StatusChart runs={runs} />
      </div>

      <RunsTable runs={runs} />

    </div>
  );
}

export default Dashboard;