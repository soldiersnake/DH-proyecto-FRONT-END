import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PayServiceForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");

  const isValid = /^[0-9]{11}$/.test(accountNumber);

  const handleContinue = () => {
    if (!isValid) return;
    navigate("/home/pay-service-resumen", {
      state: {
        ...state, // mantiene el servicio original
        accountNumber,
      },
    });
  };

  return (
    <div className="max-w-2xl min-h-screen bg-gray-100 mx-auto space-y-6 py-8">
      <div
        className="w-full max-w-4xl bg-zinc-900 text-white rounded-xl p-8 space-y-6"
        style={{ backgroundColor: "#18181b" }}
      >
        <h2 className="text-lime-400 text-2xl font-bold">
          Número de cuenta sin el primer 2
        </h2>

        <input
          type="text"
          maxLength={11}
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="37289701912"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          className="w-full px-4 py-3 rounded-lg bg-amber-50 text-black text-lg"
        />

        <p className="text-sm text-gray-300">
          Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante
          si tenés menos.
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!isValid}
            className="px-6 py-3 font-bold rounded-md transition"
            style={{
              backgroundColor: isValid ? "#ccff00" : "#a3e63580",
              color: "#000000",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayServiceForm;
