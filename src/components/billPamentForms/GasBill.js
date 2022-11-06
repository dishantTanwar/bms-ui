import React from "react";
import { useLocation } from "react-router-dom";

function GasBill() {
  const location = useLocation();
  console.log("location is (GAS): ", location);
  console.log("location state in (GAS): ", location.state);

  return <div>GasBill</div>;
}

export default GasBill;
