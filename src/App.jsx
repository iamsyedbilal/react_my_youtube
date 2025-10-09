import Head from "./components/Head";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Head />
      <Outlet />
    </div>
  );
}

export default App;
