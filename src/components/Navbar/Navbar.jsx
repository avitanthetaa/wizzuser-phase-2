import React from "react";
import "../Login/SignUp.css";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../img/dashboard.png";
import browser from "../img/browser.png";
import invest from "../img/invest.png";
import referral from "../img/referral.png";
import FAQ from "../img/FAQ.png";
import profile from "../img/profileactive.png";
import profileactive from "../img/Profile.png";
import dashboardactive from "../img/dashboardactive.png";
import browseractive from "../img/browseractive.png";
import profitsactive from "../img/profitsactive.png";
import referralactive from "../img/referralactive.png";
import faqactive from "../img/faqactive.png";

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const headerdata = [
    {
      id: 0,
      pathname: "/",
      pagename: "Dashboard",
      imgactive: dashboardactive,
      img: dashboard,
    },
    {
      id: 1,
      pathname: "/myNode",
      pagename: "My Hash",
      imgactive: browseractive,
      img: browser,
    },
    {
      id: 2,
      pathname: "/investments",
      pagename: "Rewards",
      imgactive: profitsactive,
      img: invest,
    },
    {
      id: 3,
      pathname: "/referral",
      pagename: "Referral",
      imgactive: referralactive,
      img: referral,
    },
    {
      id: 3,
      pathname: "/faq",
      pagename: "FAQ",
      imgactive: faqactive,
      img: FAQ,
    },
    // {
    //   id: 5,
    //   pathname: "/profile",
    //   pagename: "Profile",
    //   imgactive: profileactive,
    //   img: profile,
    // },
  ];
  return (
    <>
      <>
        <div className="min-h-screen b bg-[#030239] fixed z-[50]">
          <div className="sidebar min-h-screen lg:block hidden w-[3.35rem] overflow-hidden p-1 hover:w-52  hover:shadow-lg">
            <div className="flex h-screen flex-col justify-start mt-40">
              <div>
                <ul className="flex flex-col gap-7 space-y-2 tracking-wide mt-5">
                  {headerdata?.map((data) => (
                    <>
                      {pathname === data.pathname ? (
                        <li className="min-w-max effect-h">
                          <Link to={data.pathname}>
                            <div className="flex justify-start items-center  gap-5 rounded-3xl ">
                              <div className="flex justify-center items-center rounded-full btn-bg p-3 ">
                                <img
                                  src={data.imgactive}
                                  alt=""
                                  className="w-5 h-5"
                                />
                              </div>
                              <span className="text-lg text-[#22D198]">
                                {data.pagename}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ) : (
                        <li className="min-w-max">
                          <Link
                            to={data.pathname}
                            className="flex gap-5 opacity-50 hover:opacity-100 text-white text-opacity-50 hover:text-white"
                          >
                            <span className="inline-flex justify-center items-center px-3">
                              <img src={data.img} alt="" className="w-5 h-5" />
                            </span>
                            <span className="text-lg tracking-wide truncate">
                              {data.pagename}
                            </span>
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <nav class="lg:hidden  fixed top-0 inset-x-0 bg-[#030239]  py-2 flex justify-center items-center  text-sm  z-50 px-1">
          <ul className="  flex justify-center items-center p-1 md:gap-10 gap-[7px]">
            {headerdata?.map((data) => (
              <>
                {pathname === data.pathname ? (
                  <li className="min-w-max effect-h ">
                    <Link to={data.pathname}>
                      <div className="flex flex-col justify-start items-center gap-2 md:gap-5 rounded-3xl ">
                        <div className="flex justify-center items-center rounded-full btn-bg p-2 ">
                          <img
                            src={data.imgactive}
                            alt=""
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="md:text-lg text-xs text-[#22D198]">
                          {data.pagename}
                        </span>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <li className="min-w-max">
                    <Link
                      to={data.pathname}
                      className="flex flex-col md:gap-5 gap-2 opacity-50 hover:opacity-100 text-white text-opacity-50 hover:text-white"
                    >
                      <span className="inline-flex justify-center items-center px-3">
                        <img src={data.img} alt="" className="w-4 h-4" />
                      </span>
                      <span className="md:text-lg text-xs tracking-wide truncate">
                        {data.pagename}
                      </span>
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </nav>
      </>
    </>
  );
}

export default Navbar;
