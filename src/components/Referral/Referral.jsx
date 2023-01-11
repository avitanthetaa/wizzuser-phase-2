import React, { useEffect, useRef, useState } from "react";
import MainTitle from "../MainTitle/MainTitle";
import toast from "react-hot-toast";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../BaseUrl/BaseUrl";
import Button from "../Button/Button";
import { SocialIcon } from "react-social-icons";
// import ReferralPopup from "./referral popup/ReferralPopup";

const baseURLApp = process.env.REACT_APP_WEBSITE_LINK;
function Referral() {
  const { decryptData } = useEncryption();
  const getDetelis = decryptData(localStorage.getItem("details"));
  const effectCalled = useRef(false);
  const [referaalleval1, setreferaalleval1] = useState([]);
  const [referred, setreferred] = useState([{}]);

  const [open, setopen] = useState(false);
  //===== openpopp=====
  const openpopp = () => {
    setopen(!open);
  };

  /*================getAllchild API===============*/

  const getAllchild = async () => {
    try {
      const result = await instance.get("/getAllChild");
      const results = decryptData(result.data.data);

      if (results.status) {
        setreferaalleval1(results.data);
        // toast.success(results.message);
      } else {
        // toast.error(results.message);
      }
    } catch (err) {}
  };

  /*================ getAllSubChild API ===============*/

  const getAllSubChild = async () => {
    try {
      const result = await instance.get("/getAllSubChild");
      const results = decryptData(result.data.data);

      if (results.status) {
        setreferred(results.data);

        // toast.success(results.message);
      } else {
        // toast.error(results.message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getAllchild();

    // if (!effectCalled.current && getDetelis?.data?.userData?.username) {
    //   getAllchild();
    //   getAllSubChild();
    //   effectCalled.current = true;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const walletSlice = window?.tronWeb?.defaultAddress?.base58;

  localStorage.setItem("walletSlice", walletSlice);

  const walletCode = localStorage.getItem("walletSlice");

  const refferalCode = walletCode?.slice(-6);

  return (
    <div className=" container  mx-auto md:px-10 mt-5 px-5">
      <div className="mt-7 flex-col md:flex-row ">
        <MainTitle title={"Referral"} />
      </div>

      <div className="flex flex-col gap-8 py-10">
        <>
          {getDetelis && (
            <div className="text-center text-lg text-white flex flex-col justify-center items-center">
              <p className="flex gap-1">
                Referral Code : {refferalCode}
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(refferalCode);
                    toast.success("Copied successfully");
                  }}
                >
                  <i className="fa-solid fa-copy ml-2 cursor-pointer "></i>
                </div>
              </p>

              <p>
                Share your referral code with friends and get 10 % direct
                rewards for each deposits from friend.
              </p>
              <div className="my-5" onClick={openpopp}>
                <Button btn={"Share Link"} />
              </div>
              {open && (
                <>
                  <div className="flex gap-5" onClick={openpopp}>
                    <SocialIcon
                      url={`https://twitter.com/compose/tweet?url= Hello, I would like to invite you to join Aalpha Hash Mine Project. Join through  ${baseURLApp}/?ref=${refferalCode}`}
                      // bgColor="#ff5a01"
                      target="_blank"
                    />
                    {/*
                    <SocialIcon
                    url={`https://www.linkedin.com/sharing/share-offsite/?url=${baseURLApp}/?ref=${refferalCode}`}
                    target="_blank"
                    />
                  */}
                    <SocialIcon
                      url={`https://api.whatsapp.com/send/?text= Hello, I would like to invite you to join Aalpha Hash Mine Project. Join through ${baseURLApp}/?ref=${refferalCode}`}
                      target="_blank"
                    />
                    {/*
                    <SocialIcon
                    url={`https://telegram.me/share/url?url= Hello, I would like to invite you to join Aalpha Hash Mine Project. Join through ${baseURLApp}/?ref=${refferalCode}`}
                    target="_blank"
                    />
                  */}
                  </div>
                  <div className="flex mt-5">
                    <div>Link : {`${baseURLApp}/?ref=${refferalCode}`}</div>

                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${baseURLApp}/?ref=${refferalCode}`
                        );
                        toast.success("Copied successfully");
                      }}
                    >
                      <i className="fa-solid fa-copy ml-2 cursor-pointer "></i>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <MainTitle title={"Referral"} />

          <div className="rounded-2xl">
            <table className="responsive-table border1">
              <thead>
                <tr>
                  <th scope="col">Referral Wallet</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              {referaalleval1.length === 0 ? (
                <tbody>
                  <>
                    <tr>
                      <td data-title="Referral Wallet">_</td>
                      <td data-title="Date">_</td>
                    </tr>
                  </>
                </tbody>
              ) : (
                <tbody>
                  {referaalleval1?.map((items) => (
                    <>
                      <tr>
                        <td data-title="Referral Wallet">
                          {items?.walletAddress.slice(0, 4)}...
                          {items?.walletAddress.slice(-4)}
                        </td>

                        <td data-title="Date">
                          {new Date(items?.date)?.toDateString().slice(4)}
                        </td>
                        {/* <td data-title="Number of Nodes">{items?.total}</td> */}
                        {/* {items.child?.status === "Unblocked" ? (
                          <td data-title="Status(Active/Inactive)">
                            <i className="fa-sharp fa-solid fa-circle-check text-green-600"></i>
                          </td>
                        ) : (
                          <td data-title="Status(Active/Inactive)">
                            <i className="fa-sharp fa-solid fa-circle-xmark text-red-600"></i>
                          </td>
                        )} */}
                        {/* <td data-title="Spons or List">_</td>
                        <td data-title="View Member">_</td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </>
        {/* <MainTitle title={"Level 2"} />
        <div className="rounded-2xl  ">
          <table className="responsive-table border1">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Referred By</th>
                <th scope="col">Date joined</th>
                <th scope="col">Number of Nodes</th>
                <th scope="col">Status(Active/Inactive)</th>

              </tr>
            </thead>
            {referaalleval1.length === 0 ? (
              <tbody>
                <>
                  <tr>
                    <td data-title="Username">_</td>
                    <td data-title="Referred By">_</td>
                    <td data-title="Date joined">_</td>
                    <td data-title="Number of Nodes">_</td>
                    <td data-title="Status(Active/Inactive)">_</td>
                  </tr>
                </>
              </tbody>
            ) : (
              <tbody>
                {referred?.map((items) => (
                  <>
                    <tr>
                      <td data-title="Username">{items?.subData?.username}</td>
                      <td data-title="Referred By">{items?.referedBy}</td>
                      <td data-title="Date joined">
                        {new Date(
                          items?.subData?.createdAt
                        )?.toLocaleDateString()}
                      </td>
                      <td data-title="Number of Nodes">{items?.total}</td>
                      {items?.subData?.status === "Unblocked" ? (
                        <td data-title="Status(Active/Inactive)">
                          <i className="fa-sharp fa-solid fa-circle-check text-green-600"></i>
                        </td>
                      ) : (
                        <td data-title="Status(Active/Inactive)">
                          <i className="fa-sharp fa-solid fa-circle-xmark text-red-600"></i>
                        </td>
                      )}
                    </tr>
                  </>
                ))}
              </tbody>
            )}
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default Referral;
