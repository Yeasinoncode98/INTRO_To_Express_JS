// import React from "react";
// import { useForm, useWatch } from "react-hook-form";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useLoaderData } from "react-router";

// const Rider = () => {

// const SendParcel = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     // formState: { errors },
//   } = useForm();

//       const { user } = useAuth();

//       const axiosSecure = useAxiosSecure();

//         const serviceCenters = useLoaderData();
//   const regionsDuplicate = serviceCenters.map((c) => c.region);

//     const districtsByRegion = (region) => {
//     const regionDistricts = serviceCenters.filter((c) => c.region === region);
//     const districts = regionDistricts.map((d) => d.district);
//     return districts;
//   };

//   const regions = [...new Set(regionsDuplicate)];
//   //   Explore useMemo useCallback
//   const RiderRegion = useWatch({ control, name: "RiderRegion" });

// const handleRiderApplication =(data)=>{
// console.log(data);
// }

//   return (
//     <div>
//       <h2 className="text-4xl text-primary">Be a Rider</h2>
//       <form
//         onSubmit={handleSubmit(handleRiderApplication)}
//         className="mt-12 p-4 text-black"
//       >
//         {/* parcel type */}
//         <div>
//           <label className="label mr-4">
//             <input
//               type="radio"
//               {...register("parcelType")}
//               value="document"
//               className="radio"
//               defaultChecked
//             />
//             Document
//           </label>
//           <label className="label">
//             <input
//               type="radio"
//               {...register("parcelType")}
//               value="non-document"
//               className="radio"
//             />
//             Non-Document
//           </label>
//         </div>
//         {/* parcel info : name ,weight info*/}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
//           <fieldset className="fieldset">
//             <label className="label">Parcel Name</label>
//             <input
//               type="text"
//               {...register("parcelName")}
//               className="input w-full"
//               placeholder="Parcel Name"
//             />
//           </fieldset>
//           <fieldset className="fieldset">
//             <label className="label">Parcel Weight (kg)</label>
//             <input
//               type="number"
//               {...register("parcelWeight")}
//               className="input w-full"
//               placeholder="Parcel Weight"
//             />
//           </fieldset>
//         </div>
//         {/* Two Column */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
//           {/* Rider Details */}

//           <fieldset className="fieldset">
//             <h4 className="text-2xl font-semibold">Rider Details</h4>
//             {/* Rider name */}
//             <label className="label">Rider Name</label>
//             <input
//               type="text"
//               {...register("RiderName")}
//               defaultValue={user?.displayName}
//               className="input w-full"
//               placeholder="Rider Name"
//             />
//             {/* Rider Email*/}
//             <label className="label">Rider Email</label>
//             <input
//               type="text"
//               {...register("RiderEmail")}
//               defaultValue={user?.email}
//               className="input w-full"
//               placeholder="Rider Email"
//             />
//             {/* Rider region */}
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend">Rider Regions</legend>
//               <select
//                 {...register("RiderRegion")}
//                 defaultValue="Pick a Region"
//                 className="select"
//               >
//                 <option disabled={true}>Pick a Region</option>

//                 {regions.map((r, index) => (
//                   <option key={index} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </fieldset>

//             {/* Rider Districts */}
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend">Rider Districts</legend>
//               <select
//                 {...register("RiderDistrict")}
//                 defaultValue="Pick a District"
//                 className="select"
//               >
//                 <option disabled={true}>Pick a District</option>

//                 {districtsByRegion(RiderRegion).map((r, index) => (
//                   <option key={index} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </fieldset>

//             {/* Rider District
//             <label className="labe mt-4">Rider District</label>
//             <input
//               type="text"
//               {...register("RiderDistrict")}
//               className="input w-full"
//               placeholder="Rider District"
//             /> */}

//             {/* Rider Address */}
//             <label className="labe mt-4">Rider Address</label>
//             <input
//               type="text"
//               {...register("RiderAddress")}
//               className="input w-full"
//               placeholder="Rider Address"
//             />
//           </fieldset>
//           {/* Receiver info */}
//           <fieldset className="fieldset">
//             <h4 className="text-2xl font-semibold">Receiver Details</h4>
//             {/* Receiver name */}
//             <label className="label">Receiver Name</label>
//             <input
//               type="text"
//               {...register("receiverName")}
//               className="input w-full"
//               placeholder="Receiver Name"
//             />

//             {/* Receiver Email*/}
//             <label className="label">Receiver Email</label>
//             <input
//               type="text"
//               {...register("receiverEmail")}
//               className="input w-full"
//               placeholder="receiver Email"
//             />

//             {/* Receiver region */}
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend">Receiver Regions</legend>
//               <select
//                 {...register("receiverRegion")}
//                 defaultValue="Pick a Region"
//                 className="select"
//               >
//                 <option disabled={true}>Pick a Region</option>

//                 {regions.map((r, index) => (
//                   <option key={index} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </fieldset>

//             {/* Receiver Adress */}
//             <label className="labe mt-4">Receiver Address</label>
//             <input
//               type="text"
//               {...register("receiverAddress")}
//               className="input w-full"
//               placeholder="receiver Address"
//             />
//           </fieldset>
//         </div>
//         <input
//           type="submit"
//           className="btn btn-primary text-black mt-8"
//           value="Send Parcel"
//         />
//       </form>
//     </div>
//   );
// };

// export default Rider;

//................................

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const SendParcel = () => {
    const {
      register,
      handleSubmit,
      control,
      // formState: { errors },
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map((c) => c.region);

    const districtsByRegion = (region) => {
      const regionDistricts = serviceCenters.filter((c) => c.region === region);
      const districts = regionDistricts.map((d) => d.district);
      return districts;
    };

    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = useWatch({ control, name: "Region" });

    const handleRiderApplication = (data) => {
      console.log(data);
      axiosSecure.post("/riders", data).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application  has been submitted.Please Wait paitently",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    };

    return (
      <div>
        <h2 className="text-4xl text-primary">Be a Rider</h2>
        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="mt-12 p-4 text-black"
        >
          {/* Two Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
            {/* Rider Details */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Rider Details</h4>
              {/* Rider name */}
              <label className="label">Rider Name</label>
              <input
                type="text"
                {...register("Name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Rider Name"
              />
              {/* Rider Email*/}
              <label className="label">Rider Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Rider Email"
              />
              {/* Rider region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Regions</legend>
                <select
                  {...register("Region")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>

                  {regions.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Rider Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Districts</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>

                  {districtsByRegion(riderRegion).map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Rider Address */}
              <label className="labe mt-4">Your Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Rider Address"
              />
            </fieldset>
            {/* Receiver info */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">More Details</h4>
              {/* Receiver name */}
              <label className="label">Driving License</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />

              {/* Receiver Email*/}
              <label className="label">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />

              {/* Bike Info */}
              <label className="label mt-4">BIKE</label>
              <input
                type="text"
                {...register("bike")}
                className="input w-full"
                placeholder="Bike Info"
              />
            </fieldset>
          </div>
          <input
            type="submit"
            className="btn btn-primary text-black mt-8"
            value="Apply to become a rider"
          />
        </form>
      </div>
    );
  };

  return <SendParcel />;
};

export default Rider;
