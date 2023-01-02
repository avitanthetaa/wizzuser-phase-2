/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import wizzlogo from "../img/wizz-logo.png";
import { Link, useLocation } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../BaseUrl/BaseUrl";
import { toast } from "react-toastify";

function Logo() {
  const { encryptData, decryptData } = useEncryption();

  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    await window?.tronWeb?.transactionBuilder;

    if (window.tronWeb.transactionBuilder) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        setWalletAddress(window.tronWeb.defaultAddress.base58);
        localStorage.setItem("wallet", window.tronWeb.defaultAddress.base58);

        try {
          const encrypt = encryptData(
            JSON.stringify({
              walletAddress: window?.tronWeb?.defaultAddress?.base58,
            })
          );

          const result = await instance.post("/connectUser", {
            data: encrypt,
          });

          localStorage.setItem("details", result.data.data);

          const results = decryptData(result.data.data);

          if (results.status) {
            toast.success(results.message);
          } else {
            toast.error(results.message);
          }
        } catch (err) {
          ////console.log("err" + err);
        }
      } else {
        window.open(`https://www.tronlink.org/`);
      }
    }
  }

  const getWallet = localStorage.getItem("wallet");

  window.onbeforeunload = function (e) {
    window.onunload = function () {
      window.localStorage.isMySessionActive = "false";
    };
    return undefined;
  };

  window.onload = function () {
    window.localStorage.isMySessionActive = "true";
  };

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} />*/}
      <div className=" container  mx-auto md:py-10  px-10 mt-16 md:mt-16 lg:mt-0">
        <div className="flex justify-between gap-5 items-center">
          {/* 
         <Link to="/">
            <img
              src={wizzlogo}
              alt=""
              className="w-16 h-10 md:w-max md:h-max "
            />
          </Link>
        */}
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-5 gap-3 md:p-0 p-5 text-center">
          <>
            <div onClick={connectWallet}>
              <Button
                btn={`${
                  getWallet === null
                    ? "Connect Wallet"
                    : getWallet?.slice(0, 3) + "...." + getWallet?.slice(-3)
                }`}
              />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Logo;
