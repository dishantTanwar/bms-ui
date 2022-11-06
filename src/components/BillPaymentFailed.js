import React from "react";
import { useSelector } from "react-redux";

function BillPaymentFailed() {
  const bills = useSelector((state) => state.bills);
  return (
    <div>
      <h1 className="error-message">{bills.message}</h1>
      <p>{JSON.stringify(bills)}</p>
      <h2>Status: {bills.error.data.status}</h2>
      <h3>Status Code: {bills.error.status}</h3>
    </div>
  );
}

export default BillPaymentFailed;
