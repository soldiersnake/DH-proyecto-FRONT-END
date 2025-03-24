import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <aside className="fixed top-0 left-0 w-64 bg-white shadow h-screen p-6">
      <h2 className="text-lg font-bold">
        <Link to="/home">
          {user?.name} {user?.surName}
        </Link>
      </h2>
      <nav className="mt-14 space-y-4">
        <Link to="/home" className="block text-gray-700">
          Incio
        </Link>
        <Link to="/home/activity" className="block text-gray-700">
          Actividad
        </Link>
        <Link to="/home/profile" className="block text-gray-700">
          Tu Perfil
        </Link>
        <Link to="/home/carga-dinero" className="block text-gray-700">
          Carga Dinero
        </Link>
        <Link to="/home/payments" className="block text-gray-700">
          Pagar de servicios
        </Link>
        <Link to="/home/card" className="block text-gray-700">
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
