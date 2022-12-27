import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../BaseUrl/BaseUrl";
import Button from "../Button/Button";
import useEncryption from "../EncryptData/EncryptData";
import MainTitle from "../MainTitle/MainTitle";
import toast from "react-hot-toast";

function Profile({ totlenode }) {
  const navigate = useNavigate();
  const { encryptData, decryptData } = useEncryption();
  const getdata = decryptData(localStorage.getItem("details"));
  const [username, setusername] = useState(getdata?.data?.userData?.username);
  const [email, setemail] = useState(getdata?.data?.userData?.email);
  const [password, setpassword] = useState("");
  /*=============LOGOUT FUNCTION===========*/
  const handleogout = (e) => {
    e.preventDefault();
    totlenode();
    localStorage.removeItem("details");
    localStorage.clear();
    navigate("/login");
  };

  //* Prevent User For Entering Spaces
  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };
  /*=======updateProfile API ====== */
  const Profile = async (e) => {
    e.preventDefault();
    try {
      const encrypt = encryptData(
        JSON.stringify({
          username,
          password,
        })
      );
      const result = await instance.put("/updateProfile", {
        data: encrypt,
      });
      localStorage.setItem("details", result.data.data);
      const results = decryptData(result.data.data);

      if (results.status) {
        toast.success(results.message);
        toast.success("please Login again!");
        totlenode();
        navigate("/login");
        localStorage.removeItem("details");
        localStorage.clear();
      } else {
        toast.error(results.message);
      }
    } catch (err) {
      ////// console.log("err" + err);
    }
  };

  const updateUsername = () => {
    setusername("");
  };

  const updatePassword = () => {
    setpassword("");
  };

  return (
    <div>
      <div className="container mx-auto px-10">
        <MainTitle title={"Profile"} />
        <div>
          <div className="nodetype-bg  rounded-2xl items-stretch sm:p-16  p-10 flex flex-col gap-5 justify-center md:w-1/2 mx-auto  mt-20  ">
            <div>
              <label className="text-white text-lg">User name</label>
              <div className="bot-left1 rounded-md flex items-center text-[#A9A9A9] mt-1">
                <input
                  className={`w-full bg-transparent  p-2 outline-none focus:shadow-outline text-[#A9A9A9] text-lg`}
                  type="text"
                  name="username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  onKeyPress={preventSpace}
                />
                <i
                  className="fa-solid fa-pen-to-square pr-2"
                  onClick={updateUsername}
                ></i>
              </div>
            </div>
            <div>
              <label className="text-white text-lg">Email</label>
              <div className="bot-left1 rounded-md flex items-center text-[#A9A9A9] mt-1">
                <input
                  className={`w-full bg-transparent  p-2 outline-none focus:shadow-outline text-[#A9A9A9] text-lg`}
                  type="text"
                  name="username"
                  placeholder="Username@gmail.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="text-white text-lg">Password</label>
              <div className="bot-left1 rounded-md flex items-center text-[#A9A9A9] mt-1">
                <input
                  className={`w-full bg-transparent  p-2 outline-none focus:shadow-outline text-[#A9A9A9] text-lg `}
                  type="text"
                  name="username"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <i
                  className="fa-solid fa-pen-to-square pr-2"
                  onClick={updatePassword}
                ></i>
              </div>
            </div>
            {getdata?.data?.token ? (
              <div className="flex justify-end p-5 gap-5">
                <div onClick={handleogout}>
                  <Button btn={"logout"} />
                </div>
                <div onClick={Profile}>
                  <Button btn={"Save"} />
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Link to="/login">
                  <Button btn={"Log In/Sign Up"} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
