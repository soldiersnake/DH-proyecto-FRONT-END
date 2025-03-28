import { useNavigate } from "react-router-dom";

const PaymentError = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(-1); // Volver a la pantalla anterior
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <div
        className="w-full rounded-xl shadow-lg text-center px-8 py-10 space-y-4"
        style={{ backgroundColor: "#18181b", color: "#fff" }}
      >
        <div className="text-5xl text-red-600">✖️</div>
        <h2 className="text-xl font-bold">Hubo un problema con tu pago</h2>
        <hr className="my-2 border-zinc-700" />
        <p className="text-sm text-gray-300">
          Puede deberse a fondos insuficientes <br />
          Comunicate con la entidad emisora de la tarjeta
        </p>
      </div>

      <button
        onClick={handleRetry}
        className="mt-6 px-6 py-3 font-bold rounded-lg shadow"
        style={{ backgroundColor: "#ccff00", color: "#000" }}
      >
        Volver a intentarlo
      </button>
    </div>
  );
};

export default PaymentError;
