import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navigation />
        <main className="overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
