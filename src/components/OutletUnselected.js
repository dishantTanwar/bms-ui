import React from "react";

function OutletUnselected(props) {
  return props.beneficiary ? (
    <p>Please select a beneficiary</p>
  ) : (
    <div>Please select an option</div>
  );
}

export default OutletUnselected;
