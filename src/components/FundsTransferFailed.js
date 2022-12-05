import React from "react";
import { useLocation } from "react-router-dom";
import { Message } from "semantic-ui-react";

function FundsTransferFailed() {
  const location = useLocation();
  const error = location.state;
  console.log("Transaction failed: ", error);
  return (
    <Message
      className="border"
      size="huge"
      error
      header="Transaction Failed"
      list={[
        error.status
          ? "Message: Invalid Credentials"
          : "Message: " + error.data.message.toUpperCase(),
        "Status Code: " + error.status,
        "Status: " + error.data.status,
      ]}
    />
  );
}

export default FundsTransferFailed;
