import React, { useEffect, useState } from "react";
import emailuser from "../img/email.png";
import "../Login/SignUp.css";
import { useLocation } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../BaseUrl/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import OTP from "../OTP/OTP";
import Button from "../Button/Button";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [openotpbox, setopenotpbox] = useState(false);
  const { encryptData, decryptData } = useEncryption();
  const route = useLocation().pathname;

  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    email: "",
  });
  function onLoginSubmit(e) {
    e.preventDefault();
    if (email === "") {
      setError({
        ...error,
        email: "*Email address is required!",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: "*Email address is invalid!",
      });
    } else {
      SignIn();
    }
  }
  /*================SignIn API===============*/

  const SignIn = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          email,
        })
      );
      const result = await instance.post("/forgotPassword", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      if (results.status) {
        toast.success(results.message);
        setopenotpbox(true);
      } 
      // else {
      //   toast.error(results.message);
      // }
    } catch (err) {}
  };
  // useEffect(() => {
  //   return () => {
  //     // cancel the optbox
  //     setopenotpbox(false);
  //   };
  // }, []);

  return (
    <>
      {openotpbox ? (
        <OTP email={email} route={route} />
      ) : (
        <>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="flex items-center">
            <div className="w-full nodetype-bg rounded-3xl shadow-lg md:p-14 p-8 md:m-9 my-10 mx-5 md:max-w-xl md:mx-auto  container">
              <span className="block w-full golden text-[35px] font-bold   mb-14 text-center login">
                Forget Password
              </span>
              <form
                className="mb-3"
                autoComplete="off"
                onSubmit={onLoginSubmit}
              >
                <div className="flex  flex-col justify-center items-center">
                  <div className="mb-6 md:w-full text-[#030239] relative ">
                    <div
                      className={`${
                        error.email
                          ? "border-2 Rewards rounded-md"
                          : "bot-left1 "
                      } rounded-md`}
                    >
                      <input
                        className={`w-full bg-transparent  py-2 px-7 outline-none focus:shadow-outline rewardstextcolor`}
                        type="email"
                        name="email"
                        placeholder="User Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError({
                            ...error,
                            email:
                              e.target.value === ""
                                ? "*Email address is required!"
                                : !/\S+@\S+\.\S+/.test(e.target.value)
                                ? "*Email address is invalid!"
                                : "",
                          });
                        }}
                        onBlur={(e) => {
                          setEmail(e.target.value);
                          setError({
                            ...error,
                            email:
                              e.target.value === ""
                                ? "*Email address is required!"
                                : !/\S+@\S+\.\S+/.test(e.target.value)
                                ? "*Email address is invalid!"
                                : "",
                          });
                        }}
                      />
                    </div>
                    <img
                      src={emailuser}
                      alt=""
                      className="absolute top-[17px] left-2"
                    />
                    <p className="golden mt-2">{error.email}</p>
                  </div>

                  <Button btn={" Send OTP"} />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgetPassword;
