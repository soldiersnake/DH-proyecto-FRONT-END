import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mt-24 min-h-screen mx-auto space-y-6 py-8">
      <div
        className="rounded-xl shadow-lg w-full max-w-2xl text-center p-10"
        style={{ backgroundColor: "#18181b", color: "#FFFFFF" }}
      >
        <div className="text-5xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold mb-2">
          La página que buscás no existe
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          Es posible que hayas escrito mal la URL o que la página haya sido
          movida.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 font-bold rounded-lg transition"
          style={{ backgroundColor: "#ccff00", color: "#000000" }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
