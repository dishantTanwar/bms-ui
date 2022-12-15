import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetBeneficiariesQuery } from "../../backend-api/fundsTransferApi";
import beneficiarySlice from "../../slices/beneficiarySlice";
function SelectBeneficiary() {
  const userName = useSelector((state) => state.auth.user.userName);
  const { isSelected, beneficiary } = useSelector((state) => state.beneficiary);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedBeneficiary, setSelectBeneficiary] = useState({});

  const { isFetching, isSuccess, data, isLoading, error, isError, refetch } =
    useGetBeneficiariesQuery(userName);
  useEffect(() => {
    console.log("inside select beneficiary");
    refetch();
    console.log("refetch SUCCESS");
    // dispatch(fundsTransferApi.internalActions.onFocus());

    dispatch(beneficiarySlice.actions.unSelectBeneficiary);
  }, [location]);
  return (
    <>
      <div className="margin-lr-2rem center flex-col">
        {isFetching ? <p>Fetching.....</p> : null}
        {data ? (
          <>
            <p style={{ paddingRight: "1.3rem" }} className="center">
              Select beneficiary from the table below
            </p>
            <table>
              <colgroup>
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Account Number</th>
                  <th>IFSC</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((benef) => (
                  <tr key={benef.id}>
                    <td>{benef.name}</td>
                    <td>{benef.phoneNumber}</td>
                    <td>{benef.accountNumber}</td>
                    <td>{benef.ifsc}</td>
                    <td>
                      <input
                        name="beneficiary"
                        className="center"
                        onClick={() => {
                          setSelectBeneficiary(benef);
                        }}
                        type="radio"
                        value={benef}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex-row">
              <button
                type="button"
                className="select-beneficiary-btn"
                onClick={() => {
                  dispatch(
                    beneficiarySlice.actions.selectBeneficiary(
                      selectedBeneficiary
                    )
                  );
                  navigate("..");
                }}
              >
                Select
              </button>
              <button
                className="select-beneficiary-btn"
                type="button"
                onClick={() => {
                  if (selectedBeneficiary) {
                    dispatch(
                      beneficiarySlice.actions.unSelectBeneficiary(
                        selectedBeneficiary
                      )
                    );
                  }
                  navigate("..");
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p>No beneficiary found! Please add one</p>
        )}
      </div>
    </>
  );
}

export default SelectBeneficiary;
