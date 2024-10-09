import "./global.css";
import { Layout } from "./layout";
import { Outlet } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./not-found";
import { taskRepository } from "./service/task.repository";
import { taskService } from "./service/task.service";

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
          const task = await taskRepository.findById(params.id);
          return task;
        },
      },
      {
        path: "/setting",
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
