import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  // Set token in the header for all the api call using axios secure Hook

  useEffect(() => {
    // request inerceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    // Response interceptor
    const responseInterCeptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        // console.log("Error inside the interceptor", err);
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log("logout the user");
          signOutUser().then(() => {
            // Naviagte user to the login page
            navigate("/register");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterCeptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
