import React, { useState } from "react";
import closeeye from "../img/hiddenEye.png";
import openeye from "../img/openeye.png";
import passworduser from "../img/password.png";
import { Link, useNavigate } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { signup } from "../Feature/User";
import { toast } from "react-toastify";
import "../Login/SignUp.css";
import Button from "../Button/Button";

function ResetPassword({ email }) {
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { encryptData, decryptData } = useEncryption();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    password: "",
    cpwd: "",
  });
  function onLoginSubmit(e) {
    e.preventDefault();
    if (password === "") {
      setError({
        ...error,
        password: "*Password is required!",
      });
    } else if (password.length < 8) {
      setError({
        ...error,
        password: "*Password must be 8 or more characters!",
      });
    } else if (cpwd === "") {
      setError({
        ...error,
        cpwd: "*Confirm Password is required!",
      });
    } else if (password !== cpwd) {
      setError({
        ...error,
        cpwd: "*Confirm password is not matched!",
      });
    } else {
      SignUp();
    }
  }

  //* Prevent User For Entering Spaces
  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };
  /*=======SHOW PASSWORD====== */
  const onShowPassword = () => {
    setShowPass(!showPass);
  };
  /*=======SHOW Confirm PASSWORD====== */
  const onshowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  /*=======SignUp API ====== */
  const SignUp = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          password,
          cpassword: cpwd,
          email,
        })
      );
      const result = await instance.put("/setNewPassword", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      if (results.status) {
        toast.success(results.message);

        navigate("/login");
      } else {
        toast.error(results.message);
      }
    } catch (err) {
      ////// console.log("err" + err);
    }
  };

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} />*/}
      <div className="flex items-center ">
        <div className="md:w-full   nodetype-bg rounded-3xl shadow-lg md:p-14 p-8 md:m-9 my-10 mx-5 md:max-w-xl md:mx-auto container">
          <span className="block w-full golden text-[35px] font-bold   mb-10 text-center login">
            Reset Password
          </span>
          <form
            className="mb-3"
            autoComplete="off"
            autoCorrect="off"
            onSubmit={onLoginSubmit}
          >
            <div className="flex  flex-col justify-center items-center">
              <div className="mb-6 md:w-full  relative ">
                <div
                  className={`${
                    error.password
                      ? "border-2 Rewards rounded-md"
                      : "bot-left1 "
                  } rounded-md`}
                >
                  <input
                    className={`w-full bg-transparent   py-2 px-7 outline-none focus:shadow-outline rewardstextcolor `}
                    type={`${showPass ? "text" : "password"}`}
                    name="password"
                    id="password"
                    placeholder="Confirm Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError({
                        ...error,
                        password:
                          e.target.value === ""
                            ? "*Password is required!"
                            : e.target.value.length < 8
                            ? "*Password must be 8 or more characters!"
                            : null,
                      });
                    }}
                    onBlur={(e) => {
                      setPassword(e.target.value);
                      setError({
                        ...error,
                        password:
                          e.target.value === ""
                            ? "*Password is required!"
                            : e.target.value.length < 8
                            ? "*Password must be 8 or more characters!"
                            : null,
                      });
                    }}
                    onKeyPress={preventSpace}
                  />
                </div>
                <img
                  role="button"
                  alt="Eye-icon-img"
                  onClick={onShowPassword}
                  src={showPass ? openeye : closeeye}
                  className="absolute  top-4 right-3"
                />
                <img
                  src={passworduser}
                  alt=""
                  className="absolute top-[12px] left-2"
                />
                <p className="golden mt-2">{error.password}</p>
              </div>
              <div className="mb-6 md:w-full  relative ">
                <div
                  className={`${
                    error.cpwd ? "border-2 Rewards rounded-md" : "bot-left1 "
                  } rounded-md`}
                >
                  <input
                    className={` w-full bg-transparent  py-2 px-7 outline-none focus:shadow-outline rewardstextcolor `}
                    type={`${showConfirmPass ? "text" : "password"}`}
                    name="cpwd"
                    value={cpwd}
                    onChange={(e) => {
                      setCpwd(e.target.value);
                      setError({
                        ...error,
                        cpwd:
                          e.target.value === ""
                            ? "*Confirm Password is required!"
                            : e.target.value !== password
                            ? "*Confirm password is not matched!"
                            : null,
                      });
                    }}
                    onBlur={(e) => {
                      setCpwd(e.target.value);
                      setError({
                        ...error,
                        cpwd:
                          e.target.value === ""
                            ? "*Confirm Password is required!"
                            : e.target.value !== password
                            ? "*Confirm password is not matched!"
                            : null,
                      });
                    }}
                    onKeyPress={preventSpace}
                    placeholder="Confirm Password"
                  />
                </div>
                <img
                  role="button"
                  alt="Eye-icon-img"
                  onClick={onshowConfirmPass}
                  src={showConfirmPass ? openeye : closeeye}
                  className="absolute  top-4 right-3"
                />
                <img
                  src={passworduser}
                  alt=""
                  className="absolute top-[12px] left-2"
                />
                <p className="golden mt-2">{error.cpwd}</p>
              </div>

              <Button btn={"Reset"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
