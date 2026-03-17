import React, { useEffect, useState } from "react";
import { getRuns } from "../services/api";

import StatsCards from "./StatsCards";
import BuildChart from "./BuildChart";
import StatusChart from "./StatusChart";
import RunsTable from "./RunsTable";

function Dashboard() {

  const [runs, setRuns] = useState([]);

// <<<<<<< HEAD
//   const loadData = async () => {
//     const res = await getRuns();
//     setRuns(res.data);
//   };
// =======
  // const loadData = async () => {
  //   const res = await getRuns();
  //   setRuns(res.data);
  // };



//newly added 
  const loadData = async () => {
  try {
    const res = await getRuns();
    setRuns(res.data);
  } catch (err) {
    console.error("Failed to load data:", err.message);
    // don't crash — just keep runs as empty array
  }
};




//>>>>>>> feature/test-feature

  useEffect(() => {

    loadData();

    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>

      <StatsCards runs={runs} />

{/* <<<<<<< HEAD
      {/* <div className="charts">
        <BuildChart runs={runs} />
        <StatusChart runs={runs} />
      </div> */}
      {/*
      <div className="charts">
  <BuildChart runs={runs} />
  <StatusChart runs={runs} />
</div>
    ======= */}
      <div className="charts">
        <BuildChart runs={runs} />
        <StatusChart runs={runs} />
      </div>

{/* >>>>>>> feature/test-feature */}
      <RunsTable runs={runs} />

    </div>
  );
}

export default Dashboard;