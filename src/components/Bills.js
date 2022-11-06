import React from "react";
import { Link, Outlet } from "react-router-dom";

function Bills() {
  return (
    <div className="outlet level-2">
      <div className="side-bar">
        <Link to="mobile-recharge">
          <strong>Mobile Recharge</strong>
        </Link>
        <Link to="electricity-bill">
          <strong>Electricity Bill</strong>
        </Link>
        <Link to="gas-bill">
          <strong>Gas Bill</strong>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Bills;
