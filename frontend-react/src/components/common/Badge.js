import React from "react";
import "./Badge.css";

function Badge({ status }) {
  const isSuccess = status === "SUCCESS";
  const label = status || "UNKNOWN";

  return (
    <span className={`badge ${isSuccess ? "badge-success" : "badge-danger"}`}>
      <span className="badge-dot" />
      {label}
    </span>
  );
}

export default Badge;