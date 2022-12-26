import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";

const useAuth = () => {
  const { decryptData } = useEncryption();
  const getdata = decryptData(localStorage.getItem("details"));
  if (getdata?.data?.token) {
    return true;
  } else {
    return false;
  }
};

const Protected = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default Protected;
