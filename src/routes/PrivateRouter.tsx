import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { UserDataType } from "../types/UserDataType";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }: { children: JSX.Element }) => {
  const userInfo = useSelector(
    (state: { userInfo: UserDataType }) => state.userInfo
  );

  if (userInfo.role !== "") {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default PrivateRouter;
