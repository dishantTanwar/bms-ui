import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="nav-list">
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/account">
        Account
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/transfer-funds">
        Transfer Funds
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/bills">
        Pay Bills
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/history">
        Transaction History
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      &nbsp;
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>
      &nbsp;
    </nav>
  );
}

export default NavBar;
