import React from "react";

function OutletUnselected(props) {
  return props.beneficiary ? (
    <p>Please select beneficiary</p>
  ) : (
    <div className="border center flex-col outlet">
      <p className="font-large">
        You can do Mobile Recharge. <br />
        Pay Gas and Electricity Bills
      </p>
    </div>
  );
}

export default OutletUnselected;
