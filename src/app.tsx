import "./global.css";
import { Layout } from "./layout";
import { Outlet } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./not-found";
import { taskService } from "./service/task.service";
import { configService } from "./service/config.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/createTask"),
      },
      {
        path: "/createTask",
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
        path: "/task/pending",
        lazy: () => import("./pages/task"),
      },
      {
        path: "/task/error",
        lazy: () => import("./pages/task"),
      },
      {
        path: "/task/preview/:id",
        lazy: () => import("./pages/task/preview"),
        loader: async ({ params }) => {
          //params.id 先获得
          if (!params.id) {
            return undefined;
          }
          return taskService.loadTask(params.id)
        },
      },
      {
        path: "/setting",
        loader: async () => configService.get(),
        lazy: () => import("./pages/setting"),
      },
    ],
  },
]);
taskService.loadTasks()
function App() {
  return <RouterProvider router={router} />;
}

export default App;
