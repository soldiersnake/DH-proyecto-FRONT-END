import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCreditCard, FaArrowRight } from "react-icons/fa";

const IngresoDineroHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl min-h-screen  bg-gray-100 mx-auto space-y-6 py-8">
      <div className="max-w-4xl w-full space-y-6">
        {/* Transferencia bancaria */}
        <button
          onClick={() => navigate("/home/transferencia")}
          className="w-full bg-black text-lime-400 h-28 rounded-xl shadow-xl p-6 flex justify-between items-center hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-3xl" />
            <span className="text-xl font-semibold">
              Transferencia bancaria
            </span>
          </div>
          <FaArrowRight className="text-xl" />
        </button>

        {/* Seleccionar tarjeta */}
        <button
          onClick={() => navigate("/home/tarjeta")}
          className="w-full bg-black text-lime-400 h-28 rounded-xl shadow-xl p-6 flex justify-between items-center hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center gap-4">
            <FaCreditCard className="text-3xl" />
            <span className="text-xl font-semibold">Seleccionar tarjeta</span>
          </div>
          <FaArrowRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default IngresoDineroHome;
