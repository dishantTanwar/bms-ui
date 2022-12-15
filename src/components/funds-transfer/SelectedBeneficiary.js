import React from "react";
import { useSelector } from "react-redux";

function SelectedBeneficiary(props) {
  const { isSelected, beneficiary } = useSelector((state) => state.beneficiary);
  return !isSelected ? null : (
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{beneficiary.name}</td>
          <td>{beneficiary.phoneNumber}</td>
          <td>{beneficiary.accountNumber}</td>
          <td>{beneficiary.ifsc}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SelectedBeneficiary;
