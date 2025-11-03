import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // optional, for styling

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  console.log("Token", user.accessToken);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]);

  //   const handleDeleteBid = (_id) => {
  //     swal
  //       .fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           fetch(`http://localhost:3000/bids/${_id}, {
  //             method: "DELETE",
  //             headers: {
  //             //   "content-type": applic,
  //             },
  //           })
  //             .then((res) => res.json())
  //             .then((data) => {
  //               console.log("After delete", data);
  //             });

  //           // console.log('now dleted');
  //           //   swal.fire({
  //           //     title: "Deleted!",
  //           //     text: "Your file has been deleted.",
  //           //     icon: "success",
  //           //   });
  //         }
  //       });
  //   };

  const handleDeleteBid = (_id) => {
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
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After delete", data);

            // 1️⃣ Update UI by removing the deleted bid
            setBids((prevBids) => prevBids.filter((bid) => bid._id !== _id));

            // 2️⃣ Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "Your bid has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => console.error("Delete error:", err));
      }
    });
  };

  return (
    <div>
      <h3>My Bids: {bids.length} </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>product</th>
              <th>seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{bid.bid_price}</td>
                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    Remove Bid{" "}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
