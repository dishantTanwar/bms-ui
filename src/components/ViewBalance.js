import React from "react";
import { useSelector } from "react-redux";
import { useGetAccountBalanceQuery } from "../backend-api/accounts";

function ViewBalance() {
  const userName = useSelector((state) => state.auth.user.userName);
  const { isLoading, data, error, isError } =
    useGetAccountBalanceQuery(userName);
  return (
    <div className="outlet">
      <div className="prop">Current Balance</div>
      {isLoading ? <p>Balance Loading</p> : null}
      <div className="val">{JSON.stringify(data)}</div>
      {isError ? <p>there has been some error {console.log(error)}</p> : null}
    </div>
  );
}

export default ViewBalance;
