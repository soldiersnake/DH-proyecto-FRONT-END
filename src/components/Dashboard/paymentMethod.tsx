import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Card {
  id: string;
  number: string;
}

export const PaymentMethod = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const MAX_CARDS = 10; // Límite máximo de tarjetas

  const [cards, setCards] = useState<Card[]>([]);

  const fetchCards = async () => {
    const cardsRef = collection(db, `users/${user?.uid}/cards`);
    const snapshot = await getDocs(cardsRef);
    const fetchedCards = snapshot.docs.map((doc) => ({
      id: doc.id,
      number: doc.data().number,
    }));
    setCards(fetchedCards);
  };

  const removeCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, `users/${user?.uid}/cards/${id}`));
      fetchCards();
      toast.success("Tarjeta Eliminada correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al Eliminar la Tarjeta");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="max-w-2xl min-h-screen  bg-gray-100 mx-auto space-y-6 py-8">
      <div className="bg-black rounded-lg p-4 flex justify-between items-center">
        <span className="text-white font-semibold">
          Agregá tu tarjeta de débito o crédito
        </span>

        <button
          className={`text-lime-400 font-bold ${
            cards.length >= MAX_CARDS ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (cards.length < MAX_CARDS) navigate("/home/add-dard");
          }}
          disabled={cards.length >= MAX_CARDS}
        >
          ➕ Nueva tarjeta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Tus tarjetas</h3>
        {cards.length === 0 ? (
          <div className="text-gray-500 py-4">No tienes tarjetas asociadas</div>
        ) : (
          <ul>
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex justify-between items-center py-3 border-b"
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-lime-400 rounded-full"></span>
                  <span>Terminada en {card.number.slice(-4)}</span>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeCard(card.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
