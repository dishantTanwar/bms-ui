import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MANUTD_LOGO } from "../constants";
import authSlice from "../slices/authSlice";
import "../styles/NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/home");
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => console.log(location), [location]);
  return (
    <nav className="nav-list">
      <NavLink
        className="nav-link"
        to="/"
        style={{
          padding: "1rem 2rem",
        }}
      >
        <img
          // textAlign="center"
          className="logo-img"
          src={MANUTD_LOGO}
          alt="bank logo"
        />
      </NavLink>
      &nbsp;
      {isLoggedIn ? (
        <>
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
          <NavLink
            className="nav-link"
            to="/login"
            onClick={handleLogout}
            style={{
              float: "right",
              margin: "auto",
              marginRight: "3rem",
            }}
          >
            Logout
          </NavLink>
        </>
      ) : (
        <>
          {location.pathname !== "/login" && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
          &nbsp;
          {location.pathname !== "/register" && (
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          )}
        </>
      )}
      &nbsp;
    </nav>
  );
}

export default NavBar;
