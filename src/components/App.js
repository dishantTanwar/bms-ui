import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Account from "./Account";
import Bills from "./Bills";
import FundsTransfer from "./FundsTransfer";
import Home from "./Home";

// import jwt_decode from "jwt-token";
import {
  AccountDetails,
  Login,
  NavBar,
  OutletUnselected,
  ViewBalance,
} from "./index";
import Register from "./Register";
import TransactionHistory from "./TransactionHistory";

import { useDispatch, useSelector } from "react-redux";
import { useGetAccountDetailsQuery } from "../backend-api/accounts";
import authSlice from "../slices/authSlice";
import { parseJwt } from "../utils";
import ElectricityBill from "./billPamentForms/ElectricityBill";
import GasBill from "./billPamentForms/GasBill";
import MobileRecharge from "./billPamentForms/MobileRecharge";
import BillPaymentFailed from "./BillPaymentFailed";
import BillPaymentSuccess from "./BillPaymentSuccess";
const PageNotFound = () => <div>Page not Found (404)</div>;

function App() {
  const userName = parseJwt(localStorage.token).sub;
  const { data, error, isLoading, isSuccess } =
    useGetAccountDetailsQuery(userName);
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    if (
      !["/login", "/register"].includes(location.pathname) &&
      !store.auth.isLoggedIn
    ) {
      // navigate("/login");
    }
    // console.log("location is: ", location);
  }, [location]);
  if (isSuccess && data.userName === userName) {
    dispatch(
      authSlice.actions.loginSuccess({
        token: localStorage.token,
        user: data,
      })
    );
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="App">
          {/* {isLoading ? (
        <h3>app is loading</h3>
      ) : (
        <>
          <h3>Data is: </h3>
          <p>{JSON.stringify(data)} </p>
        </>
      )} */}
          <NavBar />
          <div className="body-component">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />

              {/* Accounts Routing */}
              <Route exact path="/account/*" element={<Account />}>
                <Route index element={<OutletUnselected />} />
                <Route
                  exact
                  path="account-details"
                  element={<AccountDetails />}
                />
                <Route exact path="view-balance" element={<ViewBalance />} />
              </Route>
              <Route exact path="/transfer-funds" element={<FundsTransfer />} />

              {/* Bill Payments Routing */}
              <Route exact path="/bills" element={<Bills />}>
                <Route index element={<OutletUnselected />} />
                <Route
                  exact
                  path="mobile-recharge"
                  element={<MobileRecharge />}
                />
                <Route
                  exact
                  path="electricity-bill"
                  element={<ElectricityBill />}
                />
                <Route exact path="gas-bill" element={<GasBill />} />
              </Route>

              <Route exact path="/history" element={<TransactionHistory />} />
              <Route exact path="/login" element={<Login />} />

              <Route exact path="/register" eleme nt={<Register />} />

              <Route
                exact
                path="/bill-payment-success"
                element={<BillPaymentSuccess />}
              />
              <Route
                exact
                path="/bill-payment-failed"
                element={<BillPaymentFailed />}
              />

              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
