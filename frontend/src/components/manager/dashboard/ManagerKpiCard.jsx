import React from "react";
import "./manager-dashboard.css";

function ManagerKpiCard({ title, value, unit, loading }) {
  return (
    <div className="mgrdash-kpi-item">
      <p className="mgrdash-kpi-title">{title}</p>
      <p className="mgrdash-kpi-value">
        {loading ? "-" : value}
        <span className="mgrdash-kpi-unit">{unit}</span>
      </p>
    </div>
  );
}

export default ManagerKpiCard;
