// import axios from "axios";
import React from "react";
// import swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAxios from "../../Hooks/useAxios";

const CreateAProdut = () => {
  const { user } = useAuth();
  //   const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;

    console.log(title, image, price_min, price_max);
    const newProduct = {
      title,
      image,
      price_min,
      price_max,
      email: user.email,
      seller_name: user.displayName,
    };
    // axios
    //   .post("http://localhost:3000/products", newProduct)

    //   .then((data) => {
    //     console.log(data.data);
    //     if (data.data.insertedId) {
    //       swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your Product has been created ",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });

    axiosSecure.post("/products", newProduct).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="lg:w-1/2 mx-auto">
      <form onSubmit={handleCreateAProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" name="title" />
          {/* Email */}
          <label className="label">Image Url</label>
          <input type="text" className="input" name="image" />
          {/* Bid Amount */}
          <label className="label">Min Price</label>
          <input
            type="text"
            className="input"
            name="price_min"
            placeholder="Min Price"
          />
          <label className="label">Max Price</label>
          <input
            type="text"
            className="input"
            name="price_max"
            placeholder="Max Price"
          />

          <button className="btn btn-neutral mt-4">Add A Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProdut;
