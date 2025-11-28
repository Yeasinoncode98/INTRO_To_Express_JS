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
import PaymentHistory from "../assets/pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../assets/pages/Dashboard/ApproveRiders/ApproveRIders";
import UsersManagement from "../assets/pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../assets/pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../assets/pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../assets/pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../assets/pages/Dashboard/ParcelTrack/ParcelTrack";
import DashBoardHome from "../assets/pages/Dashboard/DashBoardHome/DashBoardHome";

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
        path: "parcel-track/:trackingId",
        Component: ParcelTrack,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
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
        index: true,
        Component: <DashBoardHome></DashBoardHome>,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSucess,
      },
      {
        path: "payment-cancelled",
        Component: Paymentcancelled,
      },

      // Rider only Routes

      {
        path: "/assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "/completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      // Admin only routes

      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
