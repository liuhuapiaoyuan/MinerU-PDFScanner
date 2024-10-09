import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

import { createDatabase } from "./lib/db";

createDatabase()
.then(()=>lazy(() => import("./app")))
.then((App) => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
