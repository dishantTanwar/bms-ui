import React from "react";
import { Link, Outlet } from "react-router-dom";
function Account() {
  return (
    <div className="level-2">
      <div className="side-bar">
        <div className="padding-2rem">
          <Link to="account-details">
            <strong>Account Details</strong>
          </Link>
        </div>
        <div>
          <Link to="view-balance">
            <strong>View Balance</strong>
          </Link>
        </div>
        <div>
          <Link to="cards">
            <strong>Cards</strong>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Account;
