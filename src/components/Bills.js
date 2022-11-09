import React from "react";
import { Link, Outlet } from "react-router-dom";

function Bills() {
  return (
    <div className="outlet level-2">
      <div className="side-bar">
        <Link className="row" to="mobile-recharge">
          <strong>Mobile Recharge</strong>
        </Link>
        <Link className="row" to="electricity-bill">
          <strong>Electricity Bill</strong>
        </Link>
        <Link className="row" to="gas-bill">
          <strong>Gas Bill</strong>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Bills;
