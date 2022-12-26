import React from "react";
import "../Login/SignUp.css";
function Button({ btn }) {
  return (
    <div className="bot-left1 font-semibold rounded-full text-center">
      <button
        className="golden md:text-lg  sm:px-5 sm:py-2 px-2 py-1"
        type="submit"
      >
        {btn}
      </button>
    </div>
  );
}

export default Button;
