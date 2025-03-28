import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const filteredActivities = activities
    .filter((a) => {
      const description =
        a.destination === "Cuenta propia"
          ? "Ingresaste dinero"
          : a.description || "Actividad";

      return description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .slice(0, 4); // solo las primeras 4 actividades

  const totalBalance = activities.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user) return;
      const activityRef = collection(db, `users/${user.uid}/activity`);
      const snapshot = await getDocs(activityRef);
      const data = snapshot.docs
        .map((doc) => {
          const docData = doc.data() as { date: Timestamp };
          return {
            id: doc.id,
            ...docData,
          };
        })
        .sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());
      setActivities(data);
      console.log(data);
    };

    fetchActivity();
  }, [user]);

  const handleCopy = () => {
    if (user?.cvu) {
      navigator.clipboard.writeText(user.cvu);
      toast.success("CVU copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Saldo disponible */}
        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm">Dinero disponible</span>
              <h2 className="text-4xl font-bold mt-2">
                ${totalBalance.toLocaleString("es-AR")}
              </h2>
            </div>
            <div className="flex gap-4 text-sm underline cursor-pointer">
              <span onClick={() => navigate("/home/payment-method")}>
                Ver tarjetas
              </span>
              <div
                className="relative inline-block cursor-pointer text-sm underline"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={handleCopy}
              >
                Ver CVU
                {showTooltip && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow">
                    {user?.cvu}
                  </div>
                )}
              </div>
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
            className="w-full py-2 px-4 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Actividades recientes */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-md font-semibold mb-4">Tu actividad</h3>

          <ul className="space-y-3">
            {filteredActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      activity.amount > 0 ? "bg-lime-400" : "bg-red-400"
                    }`}
                  ></span>
                  <span>
                    {activity.destination === "Cuenta propia"
                      ? "Ingresaste dinero"
                      : activity.description || "Actividad"}
                  </span>
                </div>
                <span
                  className={`font-semibold ${
                    activity.amount > 0 ? "text-lime-600" : "text-red-600"
                  }`}
                >
                  {activity.amount > 0 ? "+" : "-"}$
                  {Math.abs(activity.amount).toLocaleString("es-AR")}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-4 text-sm underline cursor-pointer"
            onClick={() => navigate("/home/activity")}
          >
            Ver toda tu actividad
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
