import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/createTask"),
      },
      {
        path:"/createTask",
        lazy: () => import("./pages/createTask"),
      },
      {
        path: "/task/processing",

        lazy: () => import("./pages/task"),
      },
      {
        path: "/task/done",

        lazy: () => import("./pages/task"),
      },
      {
        path: "/task/error",
        lazy: () => import("./pages/task"),
      },
      {
        path: "/task/preview/:id",
        lazy: () => import("./pages/task/preview"),
      },
      {
        path: "/setting",
        lazy: () => import("./pages/setting"),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
