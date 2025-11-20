import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  //   Explore useMemo useCallback
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("Cost", cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree With The cost ?",
      text: `You will be charged for this ${cost} Taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes . I am ready to Pay!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info in database

        axiosSecure.post("/parcels", data).then((res) => {
          console.log("After saving parcel", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "parcel has created .Please Pay to continue!!",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcek</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info : name ,weight info*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* Sender Details */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* sender Email*/}
            <label className="label">Sender Email</label>
            <input
              type="text"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />
            {/* Sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
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

            {/* Sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtsByRegion(senderRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender District
            <label className="labe mt-4">Sender District</label>
            <input
              type="text"
              {...register("senderDistrict")}
              className="input w-full"
              placeholder="Sender District"
            /> */}

            {/* Sender Address */}
            <label className="labe mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
          </fieldset>
          {/* Receiver info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* Receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />

            {/* Receiver Email*/}
            <label className="label">Receiver Email</label>
            <input
              type="text"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="receiver Email"
            />

            {/* Receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
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

            {/* Receiver Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Districts</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtsByRegion(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver Adress */}
            <label className="labe mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="receiver Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-8"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
