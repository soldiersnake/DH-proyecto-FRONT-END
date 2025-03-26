import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Activity = () => {
  const { user } = useAuth();

  const [activities, setActivities] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  console.log({ activities });

  // funcion para el filtro de fecha
  const isInSelectedDateRange = (date: Date): boolean => {
    if (!dateFilter) return true;

    const now = new Date();
    const d = new Date(date);

    switch (dateFilter) {
      case "Hoy":
        return d.toDateString() === now.toDateString();

      case "Ayer":
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return d.toDateString() === yesterday.toDateString();

      case "Última semana":
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return d >= weekAgo;

      case "Últimos 15 días":
        const days15 = new Date(now);
        days15.setDate(now.getDate() - 15);
        return d >= days15;

      case "Último mes":
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return d >= monthAgo;

      case "Último año":
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        return d >= yearAgo;

      default:
        return true;
    }
  };

  // Paginacion
  const filteredActivities = activities
    .filter((activity: any) => {
      const description =
        activity.destination === "Cuenta propia"
          ? "Ingresaste dinero"
          : activity.description || "Actividad";

      return description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((activity: any) => {
      // filtro que funciona para datos de firestore, no de javascript nativo
      const dateObj = activity.date?.toDate?.();
      return dateObj ? isInSelectedDateRange(dateObj) : false;
      // return isInSelectedDateRange(new Date(activity.date));  // Este seria el filtro si fuese fecha de Javascript nativo
    });
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 5;
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user) return;
      const activityRef = collection(db, `users/${user.uid}/activity`);
      const snapshot = await getDocs(activityRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(data);
    };

    fetchActivity();
  }, [user]);

  // setea la pagina cuando cambia el buscador
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar en tu actividad"
          className="flex-1 rounded-lg border px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsFilterOpen(true)}
          className="rounded-lg px-4 py-2 font-semibold"
          style={{ backgroundColor: "#a3e635", color: "#000" }}
        >
          Filtrar <span className="ml-1">⚙️</span>
        </button>
      </div>

      {/* Lista de actividades */}
      <div className="mt-6 bg-white rounded-xl shadow p-4">
        <h3 className="font-bold mb-2">Tu actividad</h3>
        <hr className="mb-2" />

        {currentActivities.map((activity: any) => (
          <div
            key={activity.id}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: "#ccff00" }}
                className="w-4 h-4 rounded-full"
              ></div>
              <span>
                {activity.destination === "Cuenta propia"
                  ? "Ingresaste dinero"
                  : activity.description || "Actividad"}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                -${activity.amount?.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">sábado</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación (placeholder por ahora) */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className="px-3 py-1 rounded text-sm font-bold"
            style={{
              backgroundColor: num === currentPage ? "#e5e5e5" : "transparent",
              color: num === currentPage ? "#000" : "#666",
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Modal de filtros */}
      {isFilterOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div className="w-72 h-fit mt-24 mr-24 bg-white shadow-lg p-4 space-y-2 animate-slide-in">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Período</span>
              <button
                className="text-sm text-gray-500"
                onClick={() => {
                  setDateFilter(null);
                  setIsFilterOpen(false);
                }}
              >
                Borrar filtros
              </button>
            </div>

            {[
              "Hoy",
              "Ayer",
              "Última semana",
              "Últimos 15 días",
              "Último mes",
              "Último año",
            ].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="periodo"
                  checked={dateFilter === label}
                  onChange={() => setDateFilter(label)}
                />
                {label}
              </label>
            ))}

            <button
              className="w-full mt-4 py-2 font-bold rounded-lg"
              style={{ backgroundColor: "#ccff00", color: "#000" }}
              onClick={() => setIsFilterOpen(false)}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
