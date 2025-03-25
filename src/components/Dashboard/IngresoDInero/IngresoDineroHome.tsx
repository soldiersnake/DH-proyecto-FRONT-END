// src/components/IngresoDineroHome.tsx

import { useNavigate } from "react-router-dom";

const IngresoDineroHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <button
        onClick={() => navigate("/home/transferencia")}
        className="w-full bg-black text-lime-400 py-4 px-6 rounded-xl flex justify-between items-center shadow-md"
      >
        <span>Transferencia bancaria</span>
        <span>→</span>
      </button>

      <button
        onClick={() => navigate("/home/tarjeta")}
        className="w-full bg-black text-lime-400 py-4 px-6 rounded-xl flex justify-between items-center shadow-md"
      >
        <span>Seleccionar tarjeta</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default IngresoDineroHome;
