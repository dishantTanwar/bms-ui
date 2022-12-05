import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "../backend-api/fundsTransferApi";

function TransactionHistory() {
  const userName = useSelector((state) => state.auth.user.userName);
  const { isError, isSuccess, data, isFetching, error, refetch } =
    useGetTransactionsQuery(userName);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="transaction-history">
      {/* <h1>TransactionHistory</h1> */}
      {isFetching && <p>Fetching....</p>}
      {isError && <p>{error}</p>}
      {isSuccess ? (
        <>
          {/* <p>{JSON.stringify(data)}</p> */}
          <table>
            <thead>
              <tr>
                <th colSpan="4">
                  <h3>Transaction History</h3>
                </th>
              </tr>
              <tr>
                <th>Transaction ID</th>
                <th>To</th>
                <th>timestamp</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((trnx) => (
                <tr id={trnx.id}>
                  <td>{trnx.id}</td>
                  <td>{trnx.beneficiary.name}</td>
                  <td>{new Date(trnx.timestamp).toString()}</td>
                  <td>{trnx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}

export default TransactionHistory;
