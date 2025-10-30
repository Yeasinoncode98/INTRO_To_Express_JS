// import { Component, StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import Root_LayOut from "./Layout/Root_LayOut.jsx";
// import Home from "./Components/Home/Home.jsx";
// import AllProducts from "./Components/AllProducts/AllProducts.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Root_LayOut,
//     children: [
//       {
//         index: true,
//         Component: Home,
//       },
//       (path: "/allproducts")
//       (Component: AllProducts)
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* <App /> */}
//     <RouterProvider router={router} />,
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Layouts/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import AllProducts from "./Components/AllProducts/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./Components/Register/Register.jsx";
import MyProducts from "./Components/MyProducts/MyProducts.jsx";
import MyBids from "./Components/MyBids/MyBids.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allproducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myproducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/mybids",
        element: <MyBids></MyBids>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
