import React from "react";
import { useGetAccountDetailsQuery } from "../backend-api/accounts";
import { parseJwt } from "../utils";

function AccountDetails() {
  const userName = parseJwt(localStorage.token).sub;
  const { isLoading, isFetching, data, isError, error } =
    useGetAccountDetailsQuery(userName);

  return (
    <div className="outlet">
      {isLoading ? <h3>Account details are loading</h3> : null}
      {isFetching ? <h3>Fetching account details..</h3> : null}

      {isError ? (
        <>
          <h3>Opps...Met some error</h3> console.error(error);
          <p>{JSON.stringify(error)}</p>
        </>
      ) : null}

      <div className="prop">Account Number</div>
      <div className="val">{data.accountNo}</div>
      <div className="prop">First Name</div>
      <div className="val">{data.firstName}</div>
      <div className="prop">Lastname</div>
      <div className="val">{data.lastName}</div>
      <div className="prop">Email ID</div>
      <div className="val">{data.emailId}</div>
      <div className="prop">Date of Birth</div>
      <div className="val">{data.dateOfBirth}</div>
      <div className="prop">Security Question</div>
      <div className="val">{data.securityQuestion}</div>
      <div className="prop">Answer</div>
      <div className="val">*****</div>
      <div className="prop">Username</div>
      <div className="val">{data.userName}</div>
    </div>
  );
}

export default AccountDetails;
