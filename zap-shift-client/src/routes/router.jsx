import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../assets/pages/Home/Home/Home";
import Coverage from "../assets/pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../assets/pages/Auth/login/Login";
import Register from "../assets/pages/Auth/Register/Register";
import Rider from "../assets/pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../assets/pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../assets/pages/Dashboard/MyParcels/MyParcels";
import Payment from "../assets/pages/Dashboard/MyParcels/Payment/Payment";
import PaymentSucess from "../assets/pages/Dashboard/MyParcels/Payment/PaymentSuccess";
import Paymentcancelled from "../assets/pages/Dashboard/MyParcels/Payment/Paymentcancelled";

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
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSucess,
      },
      {
        path: "payment-cancelled",
        Component: Paymentcancelled,
      },
    ],
  },
]);
