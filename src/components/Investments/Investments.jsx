import React from "react";
import PortfolioBalance from "./PortfolioBalance/PortfolioBalance";
import Trading from "./Trading/Trading";

function Investments() {
  return (
    <div>
      <PortfolioBalance />
      <Trading />
    </div>
  );
}

export default Investments;
