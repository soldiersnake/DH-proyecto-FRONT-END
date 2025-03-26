import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/AuthContext";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumenIngreso = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const compRef = useRef<HTMLDivElement>(null);

  const { amount, cardId } = location.state as {
    amount: number;
    cardId: string;
  };

  const [userCVU, setUserCVU] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [confirmOperation, setConfirmOperation] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Traer datos del usuario
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setUserCVU(userData?.cvu || "");

        // Traer número de tarjeta
        const cardDoc = await getDoc(
          doc(db, "users", user.uid, "cards", cardId)
        );
        const cardData = cardDoc.data();
        setCardNumber(cardData?.number || "**** **** **** 0000");
      } catch (error) {
        toast.error("Error al cargar los datos");
      }
    };

    fetchData();
  }, [user, cardId]);

  const handleConfirm = async () => {
    try {
      const userRef = collection(db, `users/${user?.uid}/activity`);
      await addDoc(userRef, {
        userId: user?.uid,
        amount,
        date: new Date(),
        destination: "Cuenta propia",
        cvu: userCVU,
        method: "tarjeta",
        cardNumber,
      });

      toast.success("Ingreso registrado correctamente");
      //   navigate("/home/activity");
      setConfirmOperation(true);
    } catch (error) {
      toast.error("Error al guardar la actividad");
    }
  };

  const downloadReceipt = async () => {
    console.log("click");

    if (!compRef.current) return;

    const canvas = await html2canvas(compRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("comprobante.pdf");
  };

  return (
    <div className="max-w-2xl min-h-screen bg-gray-100 mx-auto space-y-6 py-8">
      {confirmOperation && (
        <div
          className="rounded-lg flex items-center justify-center flex-col py-6"
          style={{ backgroundColor: "#a3e635", color: "#000000" }} // verde lima + texto negro
        >
          <div className="text-3xl mb-2">✔️</div>
          <p className="text-xl font-bold">
            Ya cargamos el dinero en tu cuenta
          </p>
        </div>
      )}

      <div
        ref={compRef} // el id para capturar el DOM y asi exportar a PDF
        className="rounded-xl shadow-xl p-8 w-full space-y-6"
        style={{ backgroundColor: "#18181b", color: "#FFFFFF" }}
      >
        <h2 className="font-bold text-xl" style={{ color: "#a3e635" }}>
          Revisá que está todo bien
        </h2>
        <div>
          <p className="text-sm">Vas a transferir</p>
          <p className="text-2xl font-bold">${amount}</p>
        </div>
        <div>
          <p className="text-sm">Para</p>
          <p className="text-xl font-bold">Cuenta propia</p>
          <p>Brubank</p>
          <p className="text-sm">CVU {userCVU}</p>
        </div>

        {!confirmOperation ? (
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className="btn-lime px-6 py-3 rounded-md font-semibold cursor-pointer"
              //   style={{ backgroundColor: "#a3e635", color: "#000000" }}
            >
              Continuar
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/home")}
              className="btn-gray px-6 py-3 rounded-lg font-semibold cursor-pointer"
              //   style={{ backgroundColor: "#d1d5db", color: "#000000" }}
            >
              Ir al inicio
            </button>
            <button
              onClick={() => downloadReceipt()}
              className="btn-lime px-6 py-3 rounded-md font-semibold cursor-pointer"
              //   style={{ backgroundColor: "#a3e635", color: "#000" }}
            >
              Descargar comprobante
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumenIngreso;
