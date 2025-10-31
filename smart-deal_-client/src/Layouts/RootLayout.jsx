import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
