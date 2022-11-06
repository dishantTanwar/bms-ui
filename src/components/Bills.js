import React from "react";
import { Link, Outlet } from "react-router-dom";

function Bills() {
  return (
    <div className="outlet level-2">
      <div className="side-bar">
        <Link to="mobile-recharge" state={{ billType: "MOBILE_RECHARGE" }}>
          <strong>Mobile Recharge</strong>
        </Link>
        <Link
          to="electricity-bill"
          state={{
            billType: "ELECTRICITY",
          }}
        >
          <strong>Electricity Bill</strong>
        </Link>
        <Link
          to="gas-bill"
          state={{
            billType: "GAS",
          }}
        >
          <strong>Gas Bill</strong>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Bills;
