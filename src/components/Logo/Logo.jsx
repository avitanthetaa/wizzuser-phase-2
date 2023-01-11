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

  const getdata = decryptData(localStorage.getItem("details"));

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
  console.log("🚀 ~ Logo ~ getWallet", getWallet);

  window.onbeforeunload = function (e) {
    window.onunload = function () {
      window.localStorage.isMySessionActive = "false";
    };
    return undefined;
  };

  // window.onload = function () {
  //   window.localStorage.isMySessionActive = "true";
  // };

  // const txnData = async () => {
  //   try {
  //     const encrypt = encryptData(
  //       JSON.stringify({
  //         walletAddress: getdata?.data?.exists?.walletAddress,
  //         name: "smart node",
  //         currency: "TRON",
  //         quantity: 2,
  //       })
  //     );

  //     const result = await instance.post("/txnData", {
  //       data: encrypt,
  //     });

  //     localStorage.setItem("quantity", result.data.data);
  //     const results = decryptData(result.data.data);

  //     // if (results.status) {
  //     //   gettronweb();
  //     // }

  //     //  else {
  //     //   toast.error(results.message);
  //     // }
  //   } catch (err) {}
  // };

  // var transactionTron = async () => {
  //   if (window?.tronWeb && window?.tronWeb?.defaultAddress?.base58) {
  //     //if (window.tronLink.tronWeb)

  //     var tronweb = window?.tronWeb;

  //     var tx = await tronweb?.transactionBuilder?.sendTrx(
  //       "TDHmqggeSDTsxmS55uEKvVH5KJCDwCFMv7",
  //       2 * 10 ** 6,
  //       walletAddress
  //     );

  //     var signedTx = await tronweb?.trx?.sign(tx);
  //     var broastTx = await tronweb?.trx?.sendRawTransaction(signedTx);
  //     console.log(broastTx);

  //     if (broastTx.result) {
  //       // toast.success(`Transaction of ${value} tron is successful.`);
  //       // setopen(false);
  //     }

  //     txnData();
  //   }
  // };

  // // if (getWallet) {
  // //   transactionTron();
  // // }

  // if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  //   transactionTron();
  // }

  // -------------------------------------connect wallet start------------------------------------

  // const [trxBalance, setTrxBalance] = useState(0);
  // console.log("🚀 ~ App ~ trxBalance", trxBalance);
  // const [isConnected, setIsConnected] = useState(false);
  // console.log("🚀 ~ App ~ isConnected", isConnected);
  // const [address, setAddress] = useState("");
  // console.log("🚀 ~ App ~ address", address);
  // const [walletName, setWalletName] = useState("");
  // console.log("🚀 ~ App ~ walletName", walletName);

  // const connectToWallet = async () => {
  //   if (window.tronLink) {
  //     await window.tronLink.request({ method: "tron_requestAccounts" });
  //   }

  //   if (!window.tronWeb) return false;

  //   const { name, base58 } = window.tronWeb.defaultAddress;

  //   if (base58) {
  //     setAddress(base58);
  //     setWalletName(name || "");
  //     setIsConnected(true);

  //     const trxAmount = await window.tronWeb.trx.getBalance(base58);

  //     setTrxBalance(trxAmount);

  //     tronLinkEventListener();
  //     return true;
  //   }

  //   setIsConnected(false);
  //   return false;
  // };

  // const cleanData = useCallback(() => {
  //   setTrxBalance(0);
  //   setIsConnected(false);
  //   setAddress("");
  //   setWalletName("");
  // }, []);

  // const tronLinkEventListener = useCallback(() => {
  //   window.addEventListener("load", connectToWallet);

  //   window.addEventListener("message", async (msg) => {
  //     const { message } = msg.data;

  //     if (!message) return;

  //     if (
  //       message.action === "setAccount" ||
  //       message.action === "setNode" ||
  //       message.action === "tabReply" ||
  //       message.action === "accountsChanged"
  //     ) {
  //       if (message.data.address) {
  //         connectToWallet();
  //       }

  //       if (message.action !== "tabReply" && !message.data.address) {
  //         cleanData();
  //       }
  //     }
  //   });
  // }, []);

  // -------------------------------------connect wallet end------------------------------------

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
