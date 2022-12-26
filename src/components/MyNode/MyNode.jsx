import React from "react";
import MyNodedetalis from "./MyNodedetalis/MyNodedetalis";
import Search from "./Search/Search";
import UserData from "./Userd/UserData";

function MyNode({ totlenode }) {
  return (
    <div>
      {/* <Search /> */}
      {/* <UserData /> */}
      <MyNodedetalis totlenode={totlenode} />
    </div>
  );
}

export default MyNode;
