import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { _id: productId } = useLoaderData();
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);
  //   console.log(product);

  //   UseEffect
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authoriaztion: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Bids for this products", data);
        setBids(data);
      });
  }, [productId, user]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(productId, name, email, bid);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("After Placing Bids", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // Add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div>
      {/* product info */}
      <div>
        <div></div>
        <div>
          <button onClick={handleBidModalOpen} className="btn btn-primary">
            i want to Buy this product
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give The best Offer </h3>
              <p className="py-4">offer something you cant resist</p>

              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    readOnly
                    name="name"
                    defaultValue={user?.displayName || ""}
                  />
                  {/* Email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    readOnly
                    name="email"
                    defaultValue={user?.email || ""}
                  />
                  {/* Bid Amount */}
                  <label className="label">Bids</label>
                  <input
                    type="text"
                    className="input"
                    name="bid"
                    placeholder="Your Bids"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place Your Bids
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for products*/}

      <div>
        <h3 className="text-3xl">
          Bids for this product :{" "}
          <span className="text-primary">{bids.length}</span>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL Number</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Buyer Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <tr>
                    <th>{index + 1}</th>
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
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{bid.buyer_email}</td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default ProductDetails;
