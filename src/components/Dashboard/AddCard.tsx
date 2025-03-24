import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../hooks/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CardFormInputs {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

const schema = yup.object({
  number: yup
    .string()
    .required("Número requerido")
    .length(16, "Debe contener exactamente 16 dígitos"),
  expiry: yup
    .string()
    .required("Fecha requerida")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/AA requerido"),
  cvc: yup
    .string()
    .required("CVC requerido")
    .length(3, "CVC debe tener exactamente 3 dígitos"),
  name: yup
    .string()
    .required("Nombre requerido")
    .matches(/^[a-zA-Z\s-]+$/, "Solo letras, espacios y guiones"),
});

const AddCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [focus, setFocus] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CardFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let trimmedValue = value;

    if (["number", "expiry", "cvc"].includes(name)) {
      trimmedValue = value.replace(/\D/g, "");
    }

    switch (name) {
      case "number":
        trimmedValue = trimmedValue.slice(0, 16);
        break;
      case "expiry":
        trimmedValue = trimmedValue.slice(0, 4);
        if (trimmedValue.length >= 3) {
          trimmedValue = trimmedValue.slice(0, 2) + "/" + trimmedValue.slice(2);
        }
        break;
      case "cvc":
        trimmedValue = trimmedValue.slice(0, 3);
        break;
      case "name":
        trimmedValue = value.replace(/[^a-zA-Z\s-]/g, "");
        break;
      default:
        break;
    }

    setValue(name as keyof CardFormInputs, trimmedValue);
  };

  const onSubmit = async (data: any) => {
    try {
      const cardsRef = collection(db, `users/${user?.uid}/cards`);
      await addDoc(cardsRef, data);
      toast.success("Tarjeta añadida correctamente");
      navigate("/home/payment-method");
    } catch (error) {
      toast.error("Error al guardar la tarjeta");
    }
  };

  return (
    <div className="max-w-2xl min-h-screen bg-gray-100 mx-auto space-y-6 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-full">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={() => navigate("/home/payment-method")}
        >
          ✖️
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 flex justify-center">
            <Cards
              number={watch("number") || ""}
              expiry={watch("expiry") || ""}
              cvc={watch("cvc") || ""}
              name={watch("name") || ""}
              focused={focus}
            />
          </div>

          <input
            {...register("number")}
            placeholder="Número de tarjeta"
            className="border rounded px-3 py-2 w-full"
            onFocus={() => setFocus("number")}
            onChange={handleInputChange}
          />
          {errors.number && (
            <p className="text-red-500">{errors.number.message}</p>
          )}

          <input
            {...register("expiry")}
            placeholder="Vencimiento (MM/AA)"
            className="border rounded px-3 py-2 w-full"
            onFocus={() => setFocus("expiry")}
            onChange={handleInputChange}
          />
          {errors.expiry && (
            <p className="text-red-500">{errors.expiry.message}</p>
          )}

          <input
            {...register("name")}
            placeholder="Nombre titular"
            className="border rounded px-3 py-2 w-full"
            onFocus={() => setFocus("name")}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("cvc")}
            placeholder="CVC"
            className="border rounded px-3 py-2 w-full"
            onFocus={() => setFocus("cvc")}
            onChange={handleInputChange}
          />
          {errors.cvc && <p className="text-red-500">{errors.cvc.message}</p>}

          <button
            type="submit"
            className="bg-lime-400 text-black font-bold rounded px-4 py-2 w-full"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
