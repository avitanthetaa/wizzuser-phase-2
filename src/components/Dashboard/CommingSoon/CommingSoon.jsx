import React, { useEffect, useRef, useState } from "react";
import "./coming-soon.css";
import wizzlogo from "../../img/wizz-logo.png";

function CommingSoon({ setpopup }) {
  const [Timedays, Setday] = useState("00");
  const [TimeHours, SetHours] = useState("00");
  const [Timeminutes, Setminutes] = useState("00");
  const [Timeseconds, Setseconds] = useState("00");

  let interval = useRef();

  const StartTimer = () => {
    const countdown = new Date("10 31, 2022 15:00:00 ").getTime(); //month ,date ,year

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdown - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        Setday(days);
        SetHours(hours);
        Setminutes(minutes);
        Setseconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    StartTimer();
    return () => {
      //eslint-disable-next-line
      clearInterval(interval.current);
    };
  });

  return (
    <>
      <div className="  z-50 flex justify-center items-center mx-auto fixed top-0 right-0 bottom-0 left-0 backdrop-blur px-3 ">
        <div className="max-w-xl commingsoonbg py-10 rounded-xl relative  border-2 border-[#dfc055] ">
          <div
            className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={() => setpopup(false)}
          >
            <i className="fa-sharp fa-solid fa-xmark text-xl"></i>
          </div>
          <div className="animation-container  ">
            <div className="y-axis-container">
              <div className="container">
                <div className="flash" />
                <div className="coin side">
                  <div className="shine" />
                </div>
                <div className="side-coin" />
                <div className="coin">
                  <div className="dai">
                    <img src={wizzlogo} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow" />
            <div
              className="money-text-loading"
              data-loading-text="LoadingTier3..."
            />
          </div>

          <div id="countdown" className="countdown ">
            <ul>
              <div className="md:mb-5 mb-3">
                <h1 className="text-xl text-white">
                  Tier 3 has been sold. Tier 4 will be launched soon.
                </h1>
              </div>
              <li>
                <div className="flex  flex-col justify-center items-center mt-3">
                  <span className="text-white">{Timedays}</span>
                  <div className="rewardstextcolor">days</div>
                </div>
              </li>
              <li>
                <div className="flex  flex-col justify-center items-center mt-3">
                  <span className="text-white">{TimeHours}</span>
                  <div className="rewardstextcolor">Hours</div>
                </div>
              </li>
              <li>
                <div className="flex  flex-col justify-center items-center mt-3">
                  <span className="text-white">{Timeminutes}</span>
                  <div className="rewardstextcolor">Minutes</div>
                </div>
              </li>
              <li>
                <div className="flex  flex-col justify-center items-center mt-3">
                  <span className="text-white">{Timeseconds}</span>
                  <div className="rewardstextcolor">Seconds</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommingSoon;
