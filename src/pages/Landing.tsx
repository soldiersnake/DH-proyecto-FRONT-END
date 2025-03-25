import { Link } from "react-router-dom";
import _Logo from "../../public/Digital_modey-House.webp";
import { useAuth } from "../hooks/AuthContext";
import { Footer } from "../components/common/Footer";

const Landing = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <section>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            La manera más sencilla de gestionar tu dinero
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Digital Money House te permite hacer transferencias rápidas, pagar
            servicios en segundos y manejar tus finanzas desde cualquier
            dispositivo.
          </p>
          {user ? (
            <Link
              to="/Home"
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Crear cuenta
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Iniciar sesión
              </Link>
            </div>
          )}
        </section>

        <section className="flex justify-center md:justify-end">
          {/* <img
            src={Logo}
            alt="Digital Money House"
            className="w-full max-w-sm"
          /> */}
          <svg
            width="500"
            height="100"
            viewBox="0 0 500 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="65"
              font-family="Arial, sans-serif"
              font-size="38"
              fill="#D4AF37"
              font-weight="bold"
            >
              DIGITAL MONEY HOUSE
            </text>
          </svg>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
