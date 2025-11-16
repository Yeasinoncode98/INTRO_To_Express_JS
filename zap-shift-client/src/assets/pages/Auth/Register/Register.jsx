import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  console.log("In register page ", location);

  const handleRegistration = (data) => {
    console.log("After Register", data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // 1. Store the image in form data  and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the url

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("After Image Upload", res.data.data.url);
          // Update user profile to firebase

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User profile update done");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
      <p className="text-3xl text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true, minLength: 6 })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Names is Required</p>
          )}

          {/* Photo Image */}
          <label className="label">Image</label>
          {/* <input type="file" className="file-input" /> */}
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Photo is Required</p>
          )}
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true, minLength: 6 })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}

          {/* Password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 8 characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must contain at least one uppercase, one lowercase, one
              digit, and one special character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already Have an Accout?{" "}
          <Link state={location.state} className="text-blue-400" to="/login">
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
