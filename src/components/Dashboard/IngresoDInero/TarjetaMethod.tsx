import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Card {
  id: string;
  number: string;
}

const TarjetaMethod = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const MAX_CARDS = 10; // Límite máximo de tarjetas

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      const cardsRef = collection(db, `users/${user?.uid}/cards`);
      const snapshot = await getDocs(cardsRef);
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        number: doc.data().number,
      }));
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Error al cargar las tarjetas");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleContinue = () => {
    if (!selectedCardId) {
      toast.warn("Debes seleccionar una tarjeta primero.");
      return;
    }

    // Aquí irás al próximo paso, pasándole la tarjeta seleccionada
    navigate("/home/cargar-dinero/monto", {
      state: { cardId: selectedCardId },
    });
  };

  return (
    <div className="max-w-2xl min-h-screen  bg-gray-100 mx-auto space-y-6 py-8">
      <div className="bg-black rounded-xl shadow-xl p-8 space-y-6 max-w-2xl w-full">
        <h2 className="text-lime-400 font-bold text-2xl">
          Seleccionar tarjeta
        </h2>

        <div className="bg-white rounded-xl p-6 space-y-4">
          <p className="font-semibold">Tus tarjetas</p>
          {cards.length === 0 ? (
            <p className="text-gray-400">No tienes tarjetas asociadas</p>
          ) : (
            <ul>
              {cards.map((card, _index) => (
                <li
                  key={card.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full bg-lime-400"></span>
                    <span className="font-medium">
                      Terminada en {card.number.slice(-4)}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="selectedCard"
                    checked={selectedCardId === card.id}
                    onChange={() => setSelectedCardId(card.id)}
                    className="h-4 w-4 accent-lime-400"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className={`text-lime-400 font-bold ${
            cards.length >= MAX_CARDS ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (cards.length < MAX_CARDS) navigate("/home/payment-method");
          }}
          disabled={cards.length >= MAX_CARDS}
        >
          ➕ Nueva tarjeta
        </button>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="bg-lime-400 text-black font-bold rounded-lg px-8 py-3 hover:bg-lime-500 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaMethod;
