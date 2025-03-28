import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";

interface Card {
  id: string;
  expiry: string;
  cvc: string;
  name: string;
  number: string;
}

const PayServiceResumen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { service, accountNumber } = state || {};
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      if (!user) return;
      const snapshot = await getDocs(collection(db, `users/${user.uid}/cards`));
      const data = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Card)
      );
      console.log(data);

      setCards(data);
    };

    fetchCards();
  }, [user]);

  const handlePay = async () => {
    if (!selectedCard) {
      toast.warning("Selecciona una tarjeta");
      return;
    }

    try {
      const activityRef = collection(db, `users/${user?.uid}/activity`);
      await addDoc(activityRef, {
        userId: user?.uid,
        amount: -Math.abs(service.amount), // egreso
        date: new Date(),
        destination: service.name,
        method: "tarjeta",
        cardNumber: selectedCard,
        description: `Pago a ${service.name}`,
        accountNumber,
      });

      toast.success("Pago realizado correctamente");
      navigate("/home/activity");
    } catch (error) {
      toast.error("Error al registrar el pago");
      console.error(error);
      navigate("/home/payment-error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Cabecera servicio */}
      <div
        className="rounded-xl p-6 text-white"
        style={{ backgroundColor: "#18181b" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lime-400 text-xl font-bold">{service.name}</h2>
          <span className="underline cursor-pointer text-sm">
            Ver detalles del pago
          </span>
        </div>
        <hr className="my-2 border-zinc-700" />
        <div className="flex justify-between items-center text-white text-lg font-bold">
          <span>Total a pagar</span>
          <span>${service.amount.toLocaleString("es-AR")}</span>
        </div>
      </div>

      {/* Lista de tarjetas */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Tus tarjetas</h3>
        {cards.map((card: any) => (
          <label
            key={card.id}
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#ccff00" }}
              />
              <span>Terminada en {card.number.slice(-4)}</span>
            </div>
            <input
              type="radio"
              name="selectedCard"
              value={card.id}
              checked={selectedCard === card.id}
              onChange={() => setSelectedCard(card.id)}
            />
          </label>
        ))}
      </div>

      {/* Botón pagar */}
      <div className="flex justify-end">
        <button
          onClick={handlePay}
          className="px-6 py-3 font-bold rounded-lg"
          style={{
            backgroundColor: "#ccff00",
            color: "#000000",
          }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PayServiceResumen;
