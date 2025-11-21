import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Riders status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  //   handle approval

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  //   rejected

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  return (
    <div>
      <h2 className="text-5xl">Riders pending Approval :{riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.Name}</td>
                <td>{rider.email}</td>
                <td>
                  {
                    <p
                      className={`${
                        rider.status === "approved"
                          ? "text-green-500"
                          : "text-red-600"
                      } `}
                    >
                      {rider.status}
                    </p>
                  }
                </td>
                <td>{rider.district}</td>
                <td>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn mr-3"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn mr-3"
                  >
                    <CiCircleRemove />
                  </button>
                  <button className="btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
