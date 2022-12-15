import React from "react";
import { useLocation } from "react-router-dom";
import "../index.css";

function FundsTransferSuccess() {
  const location = useLocation();
  const transactionDetails = location.state;
  console.log("Transaction success location: ", transactionDetails);
  return (
    <div className="border flex-col margin-lr-2rem funds-transfer-success">
      <div className="flex-row padding-tb-2rem">
        <div>
          <h1 className="success">Transaction Successful</h1>
          <p className="success">
            Your have Successfully transfered an amount of Rs.
            {transactionDetails.amount} to beneficiary{" "}
            {transactionDetails.beneficiary.name}.
          </p>
          <p>Here are the Transaction details</p>
        </div>
        {/* <div className="border home-link">
          <Link to="/home">Home</Link>
        </div> */}
      </div>
      <div className="bill-details border">
        {/* bill id */}

        <div className="prop">Transaction ID</div>
        <div className="val">{transactionDetails.id}</div>

        {/* username */}
        <div className="prop">To</div>
        <div className="val">{transactionDetails.beneficiary.name}</div>

        {/* timestamp */}
        <div className="prop">Timestamp</div>

        <div className="val">
          {new Date(transactionDetails.timestamp).toString()}
        </div>

        {/* bill number */}
        <div className="prop">Amount</div>
        <div className="val">{transactionDetails.amount} INR</div>
      </div>
    </div>
  );
}

export default FundsTransferSuccess;
