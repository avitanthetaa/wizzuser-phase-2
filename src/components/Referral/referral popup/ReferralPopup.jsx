import React, { useState } from "react";
import Button from "../../Button/Button";
import tronImg from "../../img/tron-logo.svg";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ReferralPopup = ({ show }) => {
  const [value, setValue] = useState("");

  const { encryptData, decryptData } = useEncryption();

  const handleChange = (event) => {
    setValue(event?.target?.value?.slice(-6));
  };

  const navigate = useNavigate();

  // =========  referralCode API =========

  const referralCode = async (e) => {
    e.preventDefault();

    try {
      const encrypt = encryptData(
        JSON.stringify({
          referralCode: value,
          walletAddress: window?.tronWeb?.defaultAddress?.base58,
        })
      );

      const result = await instance.post("/addReferral", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      if (results.status) {
        toast.success(results.message);
        show();
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  const { search } = useLocation();
  console.log("🚀 ~ ReferralPopup ~ search", search)

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} />*/}
      <div
        className="py-3  z-50 flex justify-center items-center mx-auto fixed top-0 right-0 bottom-0 left-0 backdrop-blur"
        id="modal"
      >
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <>
            <div className="relative py-8 px-5 md:px-10 nodetype-bg border-[#14206A] border-2 rounded-3xl shadow-2xl -3xl  ">
              <div
                className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                onClick={() => {
                  show();
                }}
              >
                <i
                  className="fa-sharp fa-solid fa-xmark"
                  onClick={() => {
                    navigate("/");
                  }}
                ></i>
              </div>

              <form onSubmit={referralCode}>
                <div className=" mb-5 mt-2 flex bot-left1 rounded-lg">
                  <input
                    className="  focus:outline-none  font-light w-full h-10 flex items-center bg-[#97A5FC] placeholder:text-black border-y text-center caret-black"
                    placeholder="Enter Referral Code"
                    type="text"
                    // value={value ? value : search?.split("=")[1]}
                    value={value}
                    onChange={handleChange}
                    minLength="34"
                    maxLength="34"
                    required
                  />
                </div>
                <button
                  // onClick={() => referralCode()}
                  className="mx-auto flex justify-center"
                >
                  <Button btn={"Submit Referral Code"} />
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ReferralPopup;
