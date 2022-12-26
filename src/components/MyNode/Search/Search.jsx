import React, { useState } from "react";
import wizzlogo from "../../img/wizz-logo.png";
import busd from "../../img/busd.png";
import "../../Login/SignUp.css";
import Button from "../../Button/Button";
function Search() {
  const [drop, setdrop] = useState(false);
  const [mark, setmark] = useState(0);
  const wallet = [
    {
      id: 0,
      img: wizzlogo,
      walletname: "WIZZ",
      balance: 0,
    },
    {
      id: 1,
      img: busd,
      walletname: "BUSD",
      balance: 0,
    },
  ];

  return (
    <>
      <div className="container  mx-auto  flex flex-col md:flex-row justify-between items-center px-10 gap-5 md:mt-0 mt-10">
        <div className="flex md:flex-row flex-col lg:justify-center justify-start items-center md:gap-7 gap-5">
          {" "}
          <div className="flex border rounded border-dashed ">
            <button className="flex items-center justify-center px-4 ">
              <svg
                className="w-6 h-6 text-[#DADADA] "
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
              </svg>
            </button>
            <input
              type="text"
              className="px-4 py-2 lg:w-80 w-36 outline-none bg-transparent text-[#DADADA]"
              placeholder="Search"
            />
          </div>
          <div
            className="relative text-white  text-left"
            onClick={() => setdrop(!drop)}
          >
            <div className="cursor-pointer flex border  border-white justify-between gap-10 items-center  rounded-md  px-4 py-1 text-sm font-medium  shadow-sm  focus:outline-none ">
              {/* */}
              {mark === 0 ? (
                <p className="text-lg text-white">Filter By</p>
              ) : (
                <p className="py-1">{mark.walletname}</p>
              )}
              <i className="fa-solid fa-caret-down"></i>
            </div>

            {drop && (
              <div className="border bg-white text-[#19287D] border-white  absolute right-0 left-0 z-10 mt-2 cursor-pointer  rounded-md shadow-lg ">
                <div className="" role="none">
                  {wallet?.map((i) => (
                    <div
                      className="flex justify-between items-center px-4 py-3 "
                      key={i.id}
                      onClick={() => setmark(i)}
                    >
                      {/* {// console.log(i)} */}
                      <div className=" flex justify-start items-center gap-4">
                        <div>
                          <p className=" font-semibold">{i.walletname}</p>
                        </div>
                      </div>
                      <div>
                        {mark.id === i.id ? (
                          <i className="fa-solid fa-check text-[#24AF0D]"></i>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <>
          <Button btn={"Withdraw"} />
        </>
      </div>
    </>
  );
}

export default Search;
