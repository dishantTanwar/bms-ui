import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../index.css";

function BillPaymentSuccess() {
  const bills = useSelector((state) => state.bills);
  const location = useLocation();
  console.log("locationis: =======", location);
  return (
    <div className="payment-success border">
      <h1 className="success">{bills.message}</h1>
      {/* <p>{JSON.stringify(bills)}</p> */}
      <p className="success">
        Your {bills.bill.billType} payment for number{" "}
        <strong>{bills.bill.billNumber}</strong> is Successful
      </p>
      <p>Here are the Bill payment details</p>
      <div className="bill-details">
        {/* bill number */}
        <div className="prop">Phone Number</div>
        <div className="val">{bills.bill.billNumber}</div>

        {/* timestamp */}
        <div className="prop">Timestamp</div>

        <div className="val">{new Date(bills.bill.timestamp).toString()}</div>

        {/* bill type */}
        <div className="prop">Bill Type</div>
        <div className="val">{bills.bill.billType}</div>

        {/* transaction Id */}
        <div className="prop">Transaction ID</div>
        <div className="val">{bills.bill.transactionId}</div>

        {/* card type */}
        {/* <div className="prop">cardType</div> */}
        {/* <div className="val">{bills.bill.cardType}</div> */}

        {/* card number */}
        {/* <div className="prop">card number</div> */}
        {/* <div className="val">{bills.bill.cardNumber}</div> */}
      </div>
    </div>
  );
}

export default BillPaymentSuccess;
