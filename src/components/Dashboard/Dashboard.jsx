import React from "react";
import "../Login/SignUp.css";
import Dashboard from "./Dashboard/Dashboard";
import NodeTypes from "./nodeTypes/NodeTypes";

function dashboard({ totlenode }) {
  return (
    <>
      <Dashboard totlenode={totlenode} />
      {/* <NodeTypes /> */}
    </>
  );
}

export default dashboard;
