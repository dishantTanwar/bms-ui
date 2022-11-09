import React from "react";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "../backend-api/fundsTransferApi";

function TransactionHistory() {
  const userName = useSelector((state) => state.auth.user.userName);
  const { isError, isSuccess, data, isFetching, error } =
    useGetTransactionsQuery(userName);

  const x = [
    {
      id: 0,
      fromPhoneNumber: "2900813788",
      timestamp: "2022-11-06T20:31:43.440Z",
      amount: 0,
      beneficiary: {
        id: 0,
        benefactorPhoneNumber: "3355408054",
        name: "string",
        phoneNumber: "7339877540",
        accountNumber: 0,
        ifsc: "JNKW5795096",
      },
    },
  ];
  // const transactions = useEffect(() => {
  //   data.map((transaction) => ({
  //     timestamp: transaction.timestamp,
  //     to: transaction.beneficiary.name,
  //     amount: transaction.amount,
  //   }));
  // }, [isFetching]);
  return (
    <div>
      {/* <h1>TransactionHistory</h1> */}
      {isFetching && <p>Fetching....</p>}
      {isError && <p>{error}</p>}
      {isSuccess ? (
        <>
          {/* <p>{JSON.stringify(data)}</p> */}
          <table>
            <thead>
              <tr>
                <th colspan="4">Transaction History</th>
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
