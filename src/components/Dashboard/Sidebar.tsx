import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const Sidebar = () => {
  const { logoutUser } = useAuth();

  return (
    <aside className="fixed top-16 left-0 w-64 bg-lime-400 shadow h-[calc(100vh-64px-48px)] pl-6 py-6 overflow-auto">
      <nav className="space-y-4">
        <Link to="/home" className="block text-black">
          Inicio
        </Link>
        <Link to="/home/activity" className="block text-black">
          Actividad
        </Link>
        <Link to="/home/profile" className="block text-black">
          Tu Perfil
        </Link>
        <Link to="/home/carga-dinero" className="block text-black">
          Carga Dinero
        </Link>
        <Link to="/home/pay-service" className="block text-black">
          Pagar de servicios
        </Link>
        <Link to="/home/payment-method" className="block text-black">
          Tarjetas
        </Link>
        <button className="block text-red-600" onClick={logoutUser}>
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
