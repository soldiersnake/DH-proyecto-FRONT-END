import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

interface LocationState {
  cardId: string;
}

const IngresoMonto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = location.state as LocationState;

  const [amount, setAmount] = useState("");

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Por favor ingresá un monto válido.");
      return;
    }

    // Aquí podrías guardar la transacción, o pasar a una pantalla de confirmación.
    navigate("/home/cargar-dinero/resumen", {
      state: {
        cardId,
        amount: numericAmount,
      },
    });
  };

  return (
    <div className="max-w-2xl min-h-screen bg-gray-100 mx-auto space-y-6 py-8">
      <div className="bg-black text-white rounded-xl shadow-xl p-8 space-y-6 max-w-2xl w-full flex flex-col">
        <div className="flex-1">
          <h2 className="text-lime-400 font-bold text-xl mb-4">
            ¿Cuánto querés ingresar a la cuenta?
          </h2>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0"
            className="w-full px-4 py-3 rounded-md text-black bg-amber-50 text-lg focus:outline-none"
          />

          {/* contenedor para alinear el botón a la derecha */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-gray-300 text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoMonto;
