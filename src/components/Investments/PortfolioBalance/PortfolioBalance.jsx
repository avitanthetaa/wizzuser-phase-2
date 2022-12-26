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
  console.log("🚀 ~ file: Trading.jsx ~ line 9 ~ Trading ~ isReward", isReward);
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

  useEffect(() => {
    Rewards();
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

        {/* <div className="text-white text-xl text-center my-5">
          * Rewards distribution has started from 21st October, you will see
          your rewards visible from 21st of November 2022. *
        </div> */}
        <div className="flex flex-col lg:flex-row  justify-between py-6 mt-3  rounded-xl md:px-10 px-8 nodetype-bg">
          <div className="lg:order-none  order-1">
            <p className="md:text-[40px] text-[30px] text-[#7351FC] font-extrabold">
              Rewards
            </p>
            <p className="text-lg font-medium text-[#22D198]  lg:text-start">
              Portfolio balance
            </p>
            <p className="text-color lg:text-[80px] md:text-[50px] text-[30px] lg:font-extrabold font-bold">
              {isReward?.userData?.rewards}
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center  md:gap-5 gap-2 mt-2 ">
              {claim?.map((index) => (
                <>
                  <div key={index.id} onClick={() => setactive(index?.id)}>
                    <p
                      className={`md:text-lg text-base text-[#808080] cursor-pointer  ${
                        active === index.id ? "text-color" : "text-[#808080]"
                      }`}
                    >
                      {/* {index.card} */}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioBalance;
