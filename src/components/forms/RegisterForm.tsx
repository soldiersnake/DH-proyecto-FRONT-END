import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import * as yup from "yup";
import { auth, db } from "../../firebase/firebase";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface RegisterFormInputs {
  email: string;
  name: string;
  surName: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("El email es obligatorio"),
  name: yup.string().required("El nombre es obligatorio"),
  surName: yup.string().required("El apellido es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setErrorMessage(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Guardar información adicional en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: data.email,
        name: data.name,
        surName: data.surName,
        createdAt: new Date(),
      });

      navigate("/login");
    } catch (error: any) {
      setErrorMessage(
        error.message.includes("email-already-in-use")
          ? "Este correo ya está registrado."
          : "Error al registrar usuario."
      );
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Crea tu cuenta
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              register={register}
              label={"Nombre"}
              field={"name"}
              placeholder={"Nombre"}
              errors={errors?.name?.message}
            />

            <Input
              register={register}
              label={"Correo electrónico"}
              field={"surName"}
              placeholder={"Apellido"}
              errors={errors?.surName?.message}
            />

            <Input
              register={register}
              label={"Correo electrónico"}
              field={"email"}
              placeholder={"Correo electrónico"}
              errors={errors?.email?.message}
            />

            <Input
              register={register}
              label={"Contraseña"}
              field={"password"}
              placeholder={"Contraseña"}
              errors={errors?.password?.message}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center text-sm">
              {errorMessage}
            </div>
          )}

          <Button
            type={"submit"}
            text={isSubmitting ? "Registrando..." : "Registrarse"}
            disabled={isSubmitting}
          />

          <div className="text-sm text-center">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
