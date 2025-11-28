import React from "react";
import useRole from "../../../../Hooks/useRole";
import AdminDashBoard from "./AdminDashBoard";
import RiderDashBoard from "./RiderDashBoard";
import UserDashBoard from "./UserDashBoard";

const DashBoardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminDashBoard></AdminDashBoard>;
  } else if (role === "rider") {
    return <RiderDashBoard></RiderDashBoard>;
  } else {
    return <UserDashBoard></UserDashBoard>;
  }
};

export default DashBoardHome;
