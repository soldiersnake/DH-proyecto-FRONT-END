import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

interface RegisterFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Email no válido").required("Campo requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo requerido"),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // redirigir al login
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Registrar</button>
    </form>
  );
};
