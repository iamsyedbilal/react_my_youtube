import Head from "./components/Head";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const darkMode = useSelector((store) => store.theme.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <Head />
      <Outlet />
    </div>
  );
}

export default App;
