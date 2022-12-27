import React, { useEffect, useState } from "react";
import MainTitle from "../../MainTitle/MainTitle";
import "../../Login/SignUp.css";
import home from "../..//img/home.png";
import thounder from "../..//img/mythunder.png";
import king from "../..//img/myking.png";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";

function MyNodedetalis({ totlenode }) {
  const { decryptData } = useEncryption();
  const getDetelis = decryptData(localStorage.getItem("quantity"));

  const [withdrawhistory, setWithdrawhistory] = useState([]);
  const [withdrawreferralhistory, setWithdrawreferralhistory] = useState([]);

  // =======claim data========
  const claim = [
    {
      id: 0,
      card: totlenode === undefined ? 0 : totlenode,
      img: home,
    },
  ];

  // withdrawHistory

  const withdrawHistory = async () => {
    try {
      const result = await instance.get("/withdrawHistory");

      const results = decryptData(result.data.data);
      console.log("🚀 ~ withdrawHistory ~ results", results);

      if (results.status) {
        // toast.success(results.message);
        setWithdrawhistory(results.rewards_withdrawn);
        setWithdrawreferralhistory(results.referral_withdrawn);
      }
      // else {
      //   toast.error(results.message);
      // }
    } catch (err) {}
  };

  useEffect(() => {
    withdrawHistory();
  }, []);

  return (
    <>
      <div className="container  mx-auto p-10">
        <div className="mt-7 flex-col md:flex-row ">
          <MainTitle title={"Total Hash"} />
        </div>
        <div className="flex lg:flex-row flex-col justify-between items-center py-6 mt-3 bg-[#DFE5FF] rounded-xl px-10  nodetype-bg">
          <div className="flex flex-col justify-between gap-4">
            {/*
            <p className="text-[40px] text-[#7351FC] font-extrabold">My Hash</p>
            <p className="text-[91px] text-color text-center lg:text-start">
              {totlenode === undefined ? 0 : totlenode}
            </p>
            <p className="text-color border-t-2 py-4 border-white">
              
            </p>
          */}

            <p className="md:text-[40px] text-3xl text-[#7351FC] font-extrabold lg:text-end text-center">
              My Hash
            </p>
            <p className="text-4xl text-color lg:text-start text-center">
              {totlenode === undefined ? 0 : totlenode}
            </p>
            <p className="text-color border-t-2 py-4 border-white">
              {/* Total Average Tax 0% */}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4">
            {/* 
          <div className="flex justify-center items-center  gap-5 mt-2 ">
              {claim?.map((index, key) => (
                <>
                  <div
                    className=" Rewards rounded-lg gap-5 flex justify-center items-center flex-col"
                    key={index.id}
                  >
                    <div className="flex flex-col p-5 justify-between ">
                      <img
                        src={index.img}
                        alt=""
                        className="md:w-14 md:h-14 w-5 h-5"
                      />
                      <p className="rewardstextcolor mt-5 text-xl">
                        {index.card}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
        */}

            <p className="md:text-[40px] text-2xl text-[#7351FC] font-extrabold lg:text-end text-center">
              My Deposits
            </p>
            <p className="text-4xl text-color lg:text-end text-center">
              {totlenode === undefined ? 0 : totlenode * 100}
              <p className="text-sm">USDT</p>
            </p>
            <p className="text-color border-t-2 py-4 border-white">
              {/* Total Average Tax 0% */}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-10 mt-10 grid lg:grid-cols-2 gap-6">
          <div>
            <p className="text-white text-2xl font-bold text-center">Hash Rewards</p>
            <table class="responsive-table rounded-2xl">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Rewards</th>
                </tr>
              </thead>

              <tbody>
                {withdrawhistory?.map((item, index) => (
                  <tr key={index}>
                    <td data-title="Rewards">
                      {new Date(item?.createdAt)?.toDateString().slice(4)}
                    </td>
                    <td data-title="Date">{item.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
          <p className="text-white text-2xl font-bold text-center">Referral Rewards</p>
            <table class="responsive-table rounded-2xl">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Rewards</th>
                </tr>
              </thead>

              <tbody>
                {withdrawreferralhistory?.map((item, index) => (
                  <tr key={index}>
                    <td data-title="Rewards">
                      {new Date(item?.createdAt)?.toDateString().slice(4)}
                    </td>
                    <td data-title="Date">{item.rewards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyNodedetalis;
