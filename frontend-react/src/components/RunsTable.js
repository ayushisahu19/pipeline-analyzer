import React, { useState } from "react";
import Card from "./common/Card";
import Badge from "./common/Badge";
import Button from "./common/Button";
import DiagnosisModal from "./DiagnosisModal";
import "./RunsTable.css";

function RunsTable({ runs, onRunUpdated }) {
  const [selectedRun, setSelectedRun] = useState(null);

  const handleDiagnosed = (updatedRun) => {
    setSelectedRun(updatedRun);
    onRunUpdated(updatedRun);
  };

  return (
    <Card className="runs-table-card">
      <h2 className="runs-table-title">Pipeline Runs</h2>

      <div className="table-scroll">
        <table className="runs-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Build Time</th>
              <th>Status</th>
              <th>Vulnerabilities</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run._id}>
                <td className="mono">{run.branch}</td>
                <td className="mono">{run.buildTime} ms</td>
                <td>
                  <Badge status={run.status} />
                </td>
                <td className="mono">{run.vulnerabilities}</td>
                <td>
                  {run.status === "FAILED" && (
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedRun(run)}
                    >
                      {run.aiDiagnosis?.summary ? "View diagnosis" : "Diagnose"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DiagnosisModal
        run={selectedRun}
        isOpen={selectedRun !== null}
        onClose={() => setSelectedRun(null)}
        onDiagnosed={handleDiagnosed}
      />
    </Card>
  );
}

export default RunsTable;