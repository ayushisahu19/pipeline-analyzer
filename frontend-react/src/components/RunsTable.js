import React from "react";

function RunsTable({ runs }) {

  return (
    <div>

      <h2>Pipeline Runs</h2>

      <table>

        <thead>
          <tr>
            <th>Branch</th>
            <th>Build Time</th>
            <th>Status</th>
            <th>Vulnerabilities</th>
          </tr>
        </thead>

        <tbody>

          {runs.map((run, i) => (

            <tr key={i}>
              <td>{run.branch}</td>
              <td>{run.buildTime}</td>
              <td>{run.status}</td>
              <td>{run.vulnerabilities}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RunsTable;