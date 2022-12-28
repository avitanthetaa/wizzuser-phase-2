import React, { useState } from "react";
// import TronWeb from "TronWeb";
import Button from "../../Button/Button";
import tronImg from "../../img/tron-logo.svg";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import WithdrawAmount from "./WithdrawAmount";

const WithdrawReferral = ({ show, rewards, tronBalance }) => {
  console.log("🚀 ~ WithdrawReferral ~ tronBalance", tronBalance);
  console.log("🚀 ~ WithDraw ~ rewards", rewards);
  const [value, setValue] = useState(20);
  const [store, setStore] = useState([]);
  const [error, setError] = useState("");

  const { encryptData, decryptData } = useEncryption();

  const [loading, setLoading] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  //======== increment Quantity========
  function increment() {
    //setCount(prevCount => prevCount+=1);
    setValue(function (prevCount) {
      if (prevCount < 1000) {
        return (prevCount += 10);
      }
    });
  }

  // ==============decrement Quantity=========================

  function decrement() {
    setValue(function (prevCount) {
      if (prevCount > 20) {
        return (prevCount -= 10);
      } else {
        return (prevCount = 20);
      }
    });
  }

  const min = 0;
  const max = 1000;
  const handleChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    // setValue(Number(value).toString());
    setValue(value);
  };

  // ========= get rewards API =========

  const withdrawTron = async () => {
    setLoading(true);
    try {
      const encrypt = encryptData(
        JSON.stringify({
          withdraw: value,
        })
      );

      const result = await instance.post("/referralWithdraw", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);
      setStore(results);

      if (results.status) {
        toast.success(results.message);
        setLoading(false);
        setLoadingWithdraw(true);
      } else {
        toast.error(results.message);
        setLoading(false);
        show();
      }
    } catch (err) {}
  };

  const withdrawAllTron = async () => {
    if (tronBalance < rewards) {
      toast.error("Insufficient balance");
    } else {
      setValue(rewards);
      const encrypt = encryptData(
        JSON.stringify({
          withdraw: Number(rewards),
        })
      );

      const result = await instance.post("/referralWithdraw", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      setStore(results);

      if (results.status) {
        toast.success(results.message);
        setLoading(false);
      } else {
        toast.error(results.message);
        setLoading(false);
        show();
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="py-3  z-50 flex justify-center items-center mx-auto fixed top-0 right-0 bottom-0 left-0 backdrop-blur"
        id="modal"
      >
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          {!loading
            ? !store.status && (
                <>
                  <div className="relative py-8 px-5 md:px-10 nodetype-bg   border-[#14206A] border-2 rounded-3xl shadow-2xl -3xl  ">
                    <h1 className="text-[white] font-lg font-bold tracking-normal leading-tight mb-4">
                      Currency
                    </h1>
                    <div
                      className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                      onClick={() => {
                        show();
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-xmark"></i>
                    </div>
                    <>
                      <div className="relative  text-left">
                        <div>
                          <div className="flex cursor-pointer  justify-between items-center  rounded-md border bg-[#CFD6FE] text-[#515151] px-4 py-3 text-sm font-medium  shadow-sm  focus:outline-none ">
                            <div className="flex gap-5 justify-center items-center text-lg font-bold">
                              <img src={tronImg} alt="" className="w-10 h-8" />
                              <p>TRON (USDT-TRC20)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>

                    <div className="mt-10 flex justify-between items-center">
                      <label className="text-[white] text-xl font-bold leading-tight tracking-normal ">
                        Total Cost:
                      </label>

                      <button onClick={() => withdrawAllTron()}>
                        <Button btn={"Withdraw All"} />
                      </button>
                    </div>

                    <div className=" mb-5 mt-2 flex bot-left1 rounded-lg">
                      <div
                        className=" btn-bg p-2  flex justify-center items-center cursor-pointer  border-y border-l"
                        onClick={decrement}
                      >
                        <i className="fa-solid fa-minus text-center"></i>
                      </div>
                      <input
                        className="  focus:outline-none  font-light w-full h-10 flex items-center bg-[#97A5FC]   border-y text-center caret-black"
                        placeholder="Enter Quantity"
                        type="number"
                        value={value}
                        onChange={handleChange}
                        min="20"
                        max="1000"
                        step="1"
                        pattern="[0-9]*"
                      />
                      <div
                        className=" btn-bg p-2 flex justify-center items-center cursor-pointer  border-y border-r"
                        onClick={increment}
                      >
                        <i className="fa-solid fa-plus text-center"></i>
                      </div>
                    </div>

                    <button
                      onClick={() => withdrawTron()}
                      className="mx-auto flex justify-center"
                    >
                      <Button btn={"Withdraw"} />
                    </button>

                    {error && (
                      <div className="text-white text-center mt-4">
                        <p>{error}</p>
                      </div>
                    )}
                  </div>
                </>
              )
            : null}

          {loading ? (
            <div className="text-center flex justify-center">
              <div className="hm-spinner"></div>
            </div>
          ) : null}

          {!loading
            ? loadingWithdraw && (
                <WithdrawAmount
                  value={value}
                  show={show}
                  loading={() => setLoading()}
                />
              )
            : null}
        </div>
      </div>
    </>
  );
};

export default WithdrawReferral;
