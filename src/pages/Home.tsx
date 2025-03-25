import { Outlet } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import Sidebar from "../components/Dashboard/Sidebar";
import { useAuth } from "../hooks/AuthContext";
import { Login } from "./Login";

export const Home = () => {
  const { user } = useAuth();

  if (!user) return <Login />;
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-grow overflow-hidden pt-16">
        {" "}
        {/* considera altura del header */}
        <Sidebar />
        <main className="flex-grow bg-gray-100 ml-64 overflow-y-auto p-10">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
