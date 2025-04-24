import React from "react";
import RootLayout from "../layouts/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home/Home";
import Task from "../pages/Task/Task";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";

export default function AppRoutes() {
  const route = [
    {
      path: "auth",
      element: <RootLayout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "task",
          element: <Task />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
