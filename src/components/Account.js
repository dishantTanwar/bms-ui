import React from "react";
import { Link, Outlet } from "react-router-dom";
function Account() {
  return (
    <div className="level-2">
      <div className="side-bar border">
        <Link className="row side-bar-item" to="account-details">
          <strong>Account Details</strong>
        </Link>
        <Link className="row side-bar-item" to="view-balance">
          <strong>View Balance</strong>
        </Link>
        <Link className="row side-bar-item" to="cards">
          <strong>Cards</strong>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
export default Account;
