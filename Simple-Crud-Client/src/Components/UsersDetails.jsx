import React from "react";
import { useLoaderData } from "react-router";

const UsersDetails = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div>
      <h3>User Details</h3>
    </div>
  );
};

export default UsersDetails;
