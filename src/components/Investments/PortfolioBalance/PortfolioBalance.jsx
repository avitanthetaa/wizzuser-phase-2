import React, { useEffect, useState } from "react";
import MainTitle from "../../MainTitle/MainTitle";
import "../../Login/SignUp.css";
import home from "../..//img/myhome.png";
import thounder from "../..//img/mythunder.png";
import king from "../..//img/myking.png";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import toast from "react-hot-toast";
function PortfolioBalance() {
  const [active, setactive] = useState(0);

  const [isReward, setIsReward] = useState([]);

  const [rewards, setRewards] = useState(0);
  console.log("🚀 ~ PortfolioBalance ~ rewards", rewards);
  const [referralRewards, setReferralRewards] = useState(0);
  console.log("🚀 ~ PortfolioBalance ~ referralRewards", referralRewards);

  const { encryptData, decryptData } = useEncryption();

  const Rewards = async () => {
    try {
      // const result = await instance.get("/rewards");
      // const localData = localStorage.getItem("details", result.data.data)
      // console.log("🚀 ~ file: Trading.jsx ~ line 13 ~ Rewards ~ localData", localData)

      const result = await instance.get("/rewardsHistory");
      const results = decryptData(result.data.data);

      setIsReward(results.history);

      if (results.status) {
        toast.success(results.message);
      }
      // else {
      //   toast.error(results.message);
      // }
    } catch (err) {}
  };

  const getRewards = async () => {
    try {
      const result = await instance.get("/rewards");

      const results = decryptData(result.data.data);

      if (results.status) {
        // toast.success(results.message);
        setRewards(results?.data?.userData?.rewards);
        setReferralRewards(results?.data?.userData?.referralRewards);
      }
      // else {
      //   toast.error(results.message);
      // }
    } catch (err) {}
  };

  useEffect(() => {
    Rewards();
    getRewards();
  }, []);
  // =======claim data========
  const claim = [
    {
      id: 0,
      card: "1H",
    },
    {
      id: 1,
      card: "1D",
    },
    {
      id: 2,
      card: "1W",
    },
    {
      id: 3,
      card: "1M",
    },
    {
      id: 4,
      card: "1Y",
    },
    {
      id: 5,
      card: "ALL",
    },
  ];
  return (
    <>
      <div className="container  mx-auto md:px-10 md:block flex items-center flex-col">
        <div className="mt-7 flex-col md:flex-row ">
          <MainTitle title={"Rewards"} />
        </div>

        <p className="text-white text-lg font-bold text-center my-10 ">
          Mining Rewards will be added at 7:00 AM UTC everyday.
        </p>

        {/* <div className="text-white text-xl text-center my-5">
          * Rewards distribution has started from 21st October, you will see
          your rewards visible from 21st of November 2022. *
        </div> */}

        <div className="flex lg:flex-row flex-col justify-between items-center py-6 mt-3 bg-[#DFE5FF] rounded-xl px-10  nodetype-bg">
          <div className="flex flex-col justify-between gap-4">
            <p className="lg:text-[40px] text-3xl text-[#7351FC] font-extrabold lg:text-end text-center">
              Hash Rewards
            </p>
            <p className="text-4xl text-color lg:text-start text-center">
              {rewards === undefined ? 0 : rewards}

              <p className="text-sm lg:text-lg">USDT</p>
            </p>
            <p className="text-color border-t-2 py-4 border-white" />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <p className="lg:text-[40px] text-2xl text-[#7351FC] font-extrabold lg:text-end text-center">
              Referral Rewards
            </p>
            <p className="text-4xl text-color lg:text-end text-center">
              {referralRewards === undefined ? 0 : referralRewards}
              <p className="text-sm lg:text-lg">USDT</p>
            </p>
            <p />
            <p className="text-color border-t-2 py-4 border-white" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioBalance;
