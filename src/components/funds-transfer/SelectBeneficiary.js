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
    <div>
      {isError ? <p>{JSON.stringify(data)}</p> : null}

      {isFetching ? <p>Fetching.....</p> : null}
      {data ? (
        <>
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
                <th>Select</th>
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
          <button
            type="button"
            onClick={() => {
              dispatch(
                beneficiarySlice.actions.selectBeneficiary(selectedBeneficiary)
              );
              navigate("..");
            }}
          >
            Select
          </button>
          <button
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
        </>
      ) : (
        <p>No beneficiary found! Please add one</p>
      )}
    </div>
  );
}

export default SelectBeneficiary;
