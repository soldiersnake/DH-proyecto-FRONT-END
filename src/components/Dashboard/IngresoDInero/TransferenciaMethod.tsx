import { toast } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import { useAuth } from "../../../hooks/AuthContext";

const TransferenciaMethod = () => {
  const { user } = useAuth();

  const copiarAlPortapapeles = (texto: string) => {
    navigator.clipboard.writeText(texto);
    toast.success("¡Copiado al portapapeles!");
  };

  return (
    <div className="max-w-2xl min-h-screen  bg-gray-100 mx-auto space-y-6 py-8">
      <div className="bg-black text-white rounded-xl shadow-xl p-8 space-y-6 max-w-2xl w-full">
        <p className="text-xl font-semibold">
          Copia tu CVU o Alias para ingresar o transferir dinero desde otra
          cuenta
        </p>

        {/* CVU */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lime-400 font-bold text-lg">CVU</p>
            <p className="break-all">{user?.cvu || "Cargando..."}</p>
          </div>
          <button
            onClick={() => copiarAlPortapapeles(user?.cvu || "")}
            className="text-lime-400 hover:text-lime-500 transition-colors"
          >
            <FiCopy className="text-2xl" />
          </button>
        </div>

        {/* Alias */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lime-400 font-bold text-lg">Alias</p>
            <p>{user?.alias || "Cargando..."}</p>
          </div>
          <button
            onClick={() => copiarAlPortapapeles(user?.alias || "")}
            className="text-lime-400 hover:text-lime-500 transition-colors"
          >
            <FiCopy className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferenciaMethod;
