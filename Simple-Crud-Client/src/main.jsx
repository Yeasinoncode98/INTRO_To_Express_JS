import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UsersDetails from "./Components/UsersDetails.jsx";
import UpdateUser from "./Components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/users/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
    Component: UsersDetails,
  },
  {
    path: "/update/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
    Component: UpdateUser,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
