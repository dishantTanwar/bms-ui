import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../index.css";

function BillPaymentSuccess() {
  const bills = useSelector((state) => state.bills);
  const location = useLocation();
  console.log("locationis: =======", location);
  return (
    <div>
      <h1 className="success">{bills.message}</h1>
      {/* <p>{JSON.stringify(bills)}</p> */}
      <p className="success">
        Your {bills.bill.billType} payment for number{" "}
        <strong>{bills.bill.billNumber}</strong> is Successful
      </p>
      <p>Here are the Bill payment details</p>
      <div className="bill-details">
        {/* bill id */}

        <div className="prop">id</div>
        <div className="val">{bills.bill.id}</div>

        {/* username */}
        <div className="prop">username</div>
        <div className="val">{bills.bill.username}</div>

        {/* timestamp */}
        <div className="prop">timestamp</div>
        <div className="val">{bills.bill.timestamp}</div>

        {/* bill number */}
        <div className="prop">billNumber</div>
        <div className="val">{bills.bill.billNumber}</div>

        {/* bill type */}
        <div className="prop">billType</div>
        <div className="val">{bills.bill.billType}</div>

        {/* transaction Id */}
        <div className="prop">transactionId</div>
        <div className="val">{bills.bill.transactionId}</div>

        {/* card type */}
        <div className="prop">cardType</div>
        <div className="val">{bills.bill.cardType}</div>

        {/* card number */}
      </div>
    </div>
  );
}

export default BillPaymentSuccess;
