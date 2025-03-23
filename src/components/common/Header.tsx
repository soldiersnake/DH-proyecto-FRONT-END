import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export const Header = () => {
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          Digital Money House
        </Link>

        {/* Navegación desktop/tablet */}
        <div className="hidden md:flex items-center gap-8">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
                }
              >
                Iniciar sesión
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
                }
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-600">
                Hola, {user.name ?? user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        {/* Menú móvil (a completar más adelante si querés) */}
        <div className="md:hidden flex items-center">
          <button>
            <svg
              className="h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18M3 18h18"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
