import React from "react";
import { useLocation } from "react-router-dom";
import "../index.css";

function FundsTransferSuccess() {
  const location = useLocation();
  const transactionDetails = location.state;
  console.log("Transaction success location: ", transactionDetails);
  return (
    <div className="border">
      <h1 className="success">Transaction Successful</h1>
      <p className="success">
        Your have Successfully transfered an amount of Rs.
        {transactionDetails.amount} to beneficiary{" "}
        {transactionDetails.beneficiary.name}.
      </p>
      <p>Here are the Transaction details</p>
      <div className="bill-details border">
        {/* bill id */}

        <div className="prop">Transaction ID</div>
        <div className="val">{transactionDetails.id}</div>

        {/* username */}
        <div className="prop">To</div>
        <div className="val">{transactionDetails.beneficiary.name}</div>

        {/* timestamp */}
        <div className="prop">timestamp</div>
        <div className="val">{transactionDetails.timestamp}</div>

        {/* bill number */}
        <div className="prop">Amount</div>
        <div className="val">{transactionDetails.amount}</div>
      </div>
    </div>
  );
}

export default FundsTransferSuccess;
