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
      <section className="flex-grow ml-64 p-6">
        <Outlet /> {/* Aquí se renderizarán Dashboard, Profile, etc */}
      </section>
    </>
  );
};
