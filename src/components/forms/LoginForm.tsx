import { yupResolver } from "@hookform/resolvers/yup";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { LoginFormInputs, loginSchema } from "../../schemas/validation";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(true); // Si queremos ser recordados en la session o no
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    try {
      // Establecer persistencia según el checkbox
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      // Establecer persistencia antes de hacer login
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // El AuthContext se encargará de detectar el login y cargar el usuario
      navigate("/home");
    } catch (error) {
      setErrorMessage("Email o contraseña incorrectos.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Inicia sesión
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
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

          {/* Recuérdame */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Recuérdame
            </label>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center text-sm">
              {errorMessage}
            </div>
          )}

          <Button
            type={"submit"}
            text={isSubmitting ? "Ingresando..." : "Iniciar sesión"}
            disabled={isSubmitting}
          />

          <div className="text-sm text-center">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
