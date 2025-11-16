import React from "react";
import Logo from "../Components/Logo/Logo";
import AuthImg from "../assets/authImage.png";
import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div className="flex items-center">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={AuthImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
