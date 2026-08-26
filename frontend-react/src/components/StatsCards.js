import React from "react";
import { Activity, CheckCircle2, Clock } from "lucide-react";
import Card from "./common/Card";
import usePipelineStats from "../hooks/usePipelineStats";
import "./StatsCards.css";

function StatsCards({ runs }) {
  const { totalRuns, successRate, avgBuildSeconds } = usePipelineStats(runs);

  const stats = [
    { label: "Total Runs", value: totalRuns, icon: Activity },
    { label: "Success Rate", value: `${successRate}%`, icon: CheckCircle2 },
    { label: "Avg Build Time", value: `${avgBuildSeconds}s`, icon: Clock },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="stat-card">
          <Icon size={18} className="stat-icon" />
          <div>
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default StatsCards;