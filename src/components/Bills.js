import React from "react";
import { Link, Outlet } from "react-router-dom";

function Bills() {
  return (
    <div className="outlet-bills level-2">
      <div className="side-bar">
        <Link className="row side-bar-item" to="mobile-recharge">
          <strong>Mobile Recharge</strong>
        </Link>
        <Link className="row side-bar-item" to="electricity-bill">
          <strong>Electricity Bill</strong>
        </Link>
        <Link className="row side-bar-item" to="gas-bill">
          <strong>Gas Bill</strong>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Bills;
