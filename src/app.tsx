import "./global.css";
import { Layout } from "./layout";
import { Outlet } from "react-router-dom";

function App() {
  return <Layout>
    <Outlet/>
  </Layout>;
}

export default App;
