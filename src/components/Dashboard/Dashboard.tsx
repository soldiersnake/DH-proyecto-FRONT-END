import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Saldo disponible */}
        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm">Dinero disponible</span>
              <h2 className="text-4xl font-bold mt-2">$ 6.890.534,17</h2>
            </div>
            <div className="flex gap-4 text-sm underline cursor-pointer">
              <span>Ver tarjetas</span>
              <span>Ver CVU</span>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/home/carga-dinero")}
            className="py-3 bg-lime-400 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
          >
            Cargar dinero
          </button>
          <button
            onClick={() => navigate("/home/pay-service")}
            className="py-3 bg-lime-400 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
          >
            Pago de servicios
          </button>
        </div>

        {/* Buscador actividad */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Actividades recientes */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-md font-semibold mb-4">Tu actividad</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-lime-400 rounded-full"></span>
                <span>Transferiste a Rodrigo</span>
              </div>
              <span className="font-semibold">- $1.265,57</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-lime-400 rounded-full"></span>
                <span>Transferiste a Consorcio</span>
              </div>
              <span className="font-semibold">- $1.265,57</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-lime-400 rounded-full"></span>
                <span>Ingresaste dinero</span>
              </div>
              <span className="font-semibold text-lime-600">+ $1.265,57</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-lime-400 rounded-full"></span>
                <span>Te transfirieron dinero</span>
              </div>
              <span className="font-semibold text-lime-600">+ $1.265,57</span>
            </li>
          </ul>

          <div className="mt-4 text-sm underline cursor-pointer">
            Ver toda tu actividad
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
