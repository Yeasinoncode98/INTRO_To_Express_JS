import React from "react";
import { Outlet } from "react-router";
import Footer from "../assets/pages/Shared/Footer/Footer";
import NavBar from "../assets/pages/Shared/Footer/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
