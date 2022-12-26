import React from "react";
import daleft from "../img/Group 87.svg";
import daright from "../img/Group 87.svg";

function MainTitle({ title }) {
  return (
    <>
      <div className="flex justify-center items-center gap-5 text-center text-white text-3xl font-extrabold px-5 ">
        <div className="max-w-lg">
          <img src={daleft} alt="" />
        </div>
        <p className="lg:text-3xl text-2xl">{title}</p>
        <div className="max-w-lg">
          <img src={daright} alt="" className="rotate-[180deg]" />
        </div>
      </div>
    </>
  );
}

export default MainTitle;
