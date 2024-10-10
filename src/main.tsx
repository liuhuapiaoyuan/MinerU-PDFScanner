import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

import { bootstrap } from "./bootstrap";

bootstrap()
  .then(() => lazy(() => import("./app")))
  .then((App) => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
