// <<<<<<< HEAD
// // import React from "react";

// // function RunsTable({ runs }) {

// //   return (
// //     <div>

// //       <h2>Pipeline Runs</h2>

// //       <table>

// //         <thead>
// //           <tr>
// //             <th>Branch</th>
// //             <th>Build Time</th>
// //             <th>Status</th>
// //             <th>Vulnerabilities</th>
// //           </tr>
// //         </thead>

// //         <tbody>

// //           {runs.map((run, i) => (

// //             <tr key={i}>
// //               <td>{run.branch}</td>
// //               <td>{run.buildTime}</td>
// //               <td>{run.status}</td>
// //               <td>{run.vulnerabilities}</td>
// //             </tr>

// //           ))}

// //         </tbody>

// //       </table>

// //     </div>
// //   );
// // }

// // export default RunsTable;

//=======
//>>>>>>> feature/test-feature
import React from "react";

function RunsTable({ runs }) {

  return (
    <div>

{/* <<<<<<< HEAD
      <h2 style={{textAlign:"center"}}>Pipeline Runs</h2>
======= */}
      <h2>Pipeline Runs</h2>
{/* </div>>>>>>>> feature/test-feature */}

      <table>

        <thead>
          <tr>
            <th>Branch</th>
{/* <<<<<<< HEAD
            <th>Build Time (ms)</th>
======= */}
            <th>Build Time</th>
{/* >>>>>>> feature/test-feature */}
            <th>Status</th>
            <th>Vulnerabilities</th>
          </tr>
        </thead>

        <tbody>

          {runs.map((run, i) => (

            <tr key={i}>
              <td>{run.branch}</td>
              <td>{run.buildTime}</td>
{/* <<<<<<< HEAD

              <td
                className={
                  run.status === "SUCCESS"
                    ? "status-success"
                    : "status-failed"
                }
              >
                {run.status}
              </td>

======= */}
              <td>{run.status}</td>
{/* >>>>>>> feature/test-feature */}
              <td>{run.vulnerabilities}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RunsTable;