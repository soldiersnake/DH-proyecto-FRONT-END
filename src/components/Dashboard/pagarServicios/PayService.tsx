import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  logoUrl: string;
  amount: number;
}

export const PayService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, "services"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(data);
    };

    fetchServices();
  }, []);

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <input
        type="text"
        placeholder="Buscá entre más de 5.000 empresas"
        className="w-full rounded-xl border px-4 py-3 shadow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="font-bold text-lg mb-2">Más recientes</h3>

        {filtered.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={service.logoUrl}
                alt={service.name}
                className="w-10 h-10 object-contain"
              />
              <span className="font-medium">{service.name}</span>
            </div>
            <button
              onClick={() =>
                navigate("/home/pay-service-service-form", {
                  state: { service },
                })
              }
              className="text-sm font-semibold hover:underline"
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
