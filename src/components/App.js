import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./Account";
import Bills from "./Bills";
import FundsTransfer from "./FundsTransfer";
import { Login, NavBar } from "./index";
import Register from "./Register";
import TransactionHistory from "./TransactionHistory";
const Home = (props) => {
  console.log(props);
  return <div>Home</div>;
};
const PageNotFound = () => <div>Page not Found (404)</div>;

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/transfer-funds" element={<FundsTransfer />} />

        <Route exact path="/bills" element={<Bills />} />
        <Route exact path="/history" element={<TransactionHistory />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
