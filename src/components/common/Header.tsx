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
    <header className="bg-green-900 shadow-sm fixed top-0 left-0 right-0 z-50 h-16">
      <nav className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/" className="text-xl font-bold text-white">
          Digital Money House
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {!user ? (
            <>
              <NavLink to="/login" className="text-white">
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className="text-white">
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-white">
                Hola, {user.name ?? user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
