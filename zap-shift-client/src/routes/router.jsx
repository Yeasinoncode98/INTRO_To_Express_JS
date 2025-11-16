import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../assets/pages/Home/Home/Home";
import Coverage from "../assets/pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../assets/pages/Auth/login/Login";
import Register from "../assets/pages/Auth/Register/Register";
import Rider from "../assets/pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
