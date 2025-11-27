import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link, Links } from "react-router";
const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`); // Fix here
      return res.data;
    },
  });

  // const handleParcelDelete = (id) => {
  //   console.log(id);

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.delete(`/parcels/${id}`).then((res) => {
  //         console.log(res.data);
  //       });

  //       // Swal.fire({
  //       //   title: "Deleted!",
  //       //   text: "Your file has been deleted.",
  //       //   icon: "success",
  //       // });
  //     }
  //   });
  // };

  const handleParcelDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // FIX: Correct the URL to match the backend route `/parcel/${id}`
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            // refresh the data in UI
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel  request has been deleted.",
              icon: "success",
            });
          }
        });
        // .catch((error) => {
        //   console.error("Error deleting parcel:", error);
        //   Swal.fire({
        //     title: "Error!",
        //     text: "Something went wrong. Please try again.",
        //     icon: "error",
        //   });
        // });
      }
    });
  };

  return (
    <div>
      <h2>All My parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-sm btn-primary text-black">
                        Pay
                      </button>
                    </Link>
                  )}
                </td>
                <td to={`parcel-track/${parcel.trackingId}`}>
                  <Link>{parcel.trackingId}</Link>
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashCan />
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

export default MyParcels;
