import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormInputs = yup.InferType<typeof loginSchema>;
