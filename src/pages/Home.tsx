import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { useAuth } from "../hooks/AuthContext";
import { Login } from "./Login";

export const Home = () => {
  const { user } = useAuth();

  if (!user) return <Login />;
  return (
    <>
      <Sidebar />
      <section className="flex-grow  bg-gray-100 ml-64 p-10">
        <Outlet /> {/* Aquí se renderizarán Dashboard, Profile, etc */}
      </section>
    </>
  );
};
