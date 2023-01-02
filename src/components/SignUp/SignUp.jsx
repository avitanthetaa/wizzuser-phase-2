import React, { useEffect, useState } from "react";
import closeeye from "../img/hiddenEye.png";
import openeye from "../img/openeye.png";
import user from "../img/user.png";
import emailuser from "../img/email.png";
import passworduser from "../img/password.png";
import invite from "../img/invite.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OTP from "../OTP/OTP";
import "../Login/SignUp.css";
import Button from "../Button/Button";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [referralCode, setRefCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { encryptData, decryptData } = useEncryption();
  const [openotpbox, setopenotpbox] = useState(false);
  const route = useLocation().pathname;
  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    cpwd: "",
    referralCode: "",
  });

  function onChangeUsername(e) {
    const input = e.currentTarget.value;
    if (/^[^!-\/:-@\[-`{-~]+$/.test(input) || input === "") {
      setUsername(input);
      setError({
        ...error,
        username: e.target.value === "" ? "*Username is required!" : "",
      });
    }
  }

  function onChangeEmail(e) {
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
  }

  function onChangePassword(e) {
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
  }

  function onChangeCpassword(e) {
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
  }
  function onChangereffrel(e) {
    setRefCode(e.target.value);
    setError({
      ...error,
      referralCode:
        e.target.value === "" ? `You must have a sponsor code!` : null,
    });
  }

  function onLoginSubmit(e) {
    e.preventDefault();
    if (username === "") {
      setError({
        ...error,
        username: "*Username is required!",
      });
    } else if (email === "") {
      setError({
        ...error,
        email: "*Email address is required!",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: "*Email address is invalid!",
      });
    } else if (password === "") {
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
    } else if (referralCode === "") {
      setError({
        ...error,
        referralCode: `You must have a sponsor code!`,
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
          email,
          username,
          password,
          referralCode,
        })
      );
      const result = await instance.post("/signup", {
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
    } catch (err) {
      ////console.log("err" + err);
    }
  };
  /*========******* replce function======== */
  const getMaskedNumber = (number) => {
    const endDigits = number.slice(-3);
    return endDigits.padStart(number.length, "*");
  };
  // useEffect(() => {
  //   return () => {
  //     // cancel the optbox
  //     setopenotpbox(false);
  //   };
  // }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("ref");
    setRefCode(myParam);
  }, []);
  const userdata = [
    // {
    //   id: 0,
    //   errorusername: error.username,
    //   type: "text",
    //   placeholder: "User Name",
    //   value: username,
    //   onChange: onChangeUsername,
    //   img: user,
    // },
    // {
    //   id: 1,
    //   errorusername: error.email,
    //   type: "text",
    //   placeholder: "User Emai",
    //   value: email,
    //   onChange: onChangeEmail,
    //   img: emailuser,
    // },
    // {
    //   id: 2,
    //   errorusername: error.password,
    //   type: showPass ? "text" : "password",
    //   placeholder: "User Password",
    //   value: password,
    //   onChange: onChangePassword,
    //   img: passworduser,
    //   passwordimg: showPass ? openeye : closeeye,
    //   onShowPassword: onShowPassword,
    // },
    // {
    //   id: 3,
    //   errorusername: error.cpwd,
    //   type: showConfirmPass ? "text" : "password",
    //   placeholder: "Confirm Password",
    //   value: cpwd,
    //   onChange: onChangeCpassword,
    //   img: passworduser,
    //   passwordimg: showConfirmPass ? openeye : closeeye,
    //   onShowPassword: onshowConfirmPass,
    // },
    // {
    //   id: 4,
    //   errorusername: error.referralCode,
    //   type: "text",
    //   placeholder: "Invite Code",
    //   value: referralCode,
    //   onChange: onChangereffrel,
    //   img: invite,
    // },
  ];
  return (
    <>
      {openotpbox ? (
        <OTP email={email} route={route} />
      ) : (
        <>
          {/* <Toaster position="top-right" reverseOrder={false} />*/}
          <div className="flex items-center ">
            <div className="md:w-full nodetype-bg  e rounded-3xl shadow-lg md:p-14 p-8 md:m-9 my-10 mx-5 md:max-w-xl md:mx-auto container">
              <span className="block w-full text-[35px] font-bold golden   mb-10 text-center login">
                Sign Up
              </span>
              <form
                className="mb-3"
                autoComplete="off"
                autoCorrect="off"
                onSubmit={onLoginSubmit}
              >
                <div className="flex  flex-col justify-center items-center">
                  {/* {userdata.map((items) => (
                    <>
                      <div className="mb-6 md:w-full   relative">
                        <div
                          className={`${
                            items.errorusername
                              ? "border-2 Rewards rounded-md"
                              : "bot-left1 "
                          } rounded-md`}
                        >
                          <input
                            className={`w-full bg-transparent   py-2 px-7 outline-none focus:shadow-outline rewardstextcolor `}
                            type={items.type}
                            name="username"
                            placeholder={items.placeholder}
                            value={items.value}
                            onChange={items.onChange}
                            onKeyPress={preventSpace}
                            onBlur={items.onChange}
                          />
                        </div>
                        <img
                          src={items.img}
                          alt=""
                          className="absolute top-[13px] left-2"
                        />
                        {(items.id === 3 || items.id === 2) && (
                          <img
                            role="button"
                            alt="Eye-icon-img"
                            onClick={items.onShowPassword}
                            src={items.passwordimg}
                            className="absolute  top-4 right-3"
                          />
                        )}
                        <p className=" golden mt-2">{items.errorusername}</p>
                      </div> 
                    </>
                  ))} */}
                  <Button btn={" Sign Up"} />
                </div>
              </form>

              <div className="flex gap-2 justify-center items-center">
                <p className="rewardstextcolor  text-sm">Have an account?</p>
                <Link className="golden  text-[16px] font-medium" to="/login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
