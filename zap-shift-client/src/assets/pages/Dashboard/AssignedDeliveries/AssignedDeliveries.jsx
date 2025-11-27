// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAuth from "../../../../Hooks/useAuth";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const AssignedDeliveries = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: parcels = [], refetch } = useQuery({
//     queryKey: ["parcels", user.email, "driver-assigned"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/parcels/rider?riderEmail=${user.email} & deliveryStatus =driver-assigned `
//       );
//       return res.data;
//     },
//   });

//   const handleAcceptDelivery = (parcel) => {
//     const statusInfo = { deliveryStatus: "rider_arriving" };
//     axiosSecure
//       .patch(`/parcels/${parcel._id}/status`, statusInfo)
//       .then((res) => {
//         if (res.data.modifiedCount) {
//           refetch();
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: `Thank You for accepting`,
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         }
//       });
//   };

//   return (
//     <div>
//       <h2 className="text-4xl">Parcels pending pickup: {parcels.length}</h2>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Confirm</th>
//               <th>Other Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel, index) => (
//               <tr key={parcel._id}>
//                 <th>{index + 1}</th>
//                 <td>{parcel.parcelName}</td>
//                 <td>
//                   {parcel.deliveryStatus === "driver_assigned" && (

//                   ?  <>
//                       <button
//                         onClick={() => handleAcceptDelivery(parcel)}
//                         className="btn btn-primary text-black"
//                       >
//                         Accept
//                       </button>
//                       <button className="btn btn-warning text-warning ms-2">
//                         Reject
//                       </button>
//                     </>
//                     : <span>Accepted</span>

//                   )}
//                 </td>
//                 <td>Blue</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignedDeliveries;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    let message = `Parcel Status is Updated with ${status.split("_").join()}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl">Parcels pending pickup: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider-arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-warning ms-2">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as Picked Up
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                    }
                    className="btn btn-primary text-black mx-2"
                  >
                    Mark as Delivered
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

export default AssignedDeliveries;
