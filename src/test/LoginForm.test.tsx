import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

describe("LoginForm", () => {
  it("muestra errores si no se completa el formulario", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Simulamos blur en los campos para que se active la validación de RHF
    fireEvent.blur(screen.getByPlaceholderText(/correo electrónico/i));
    fireEvent.blur(screen.getByPlaceholderText(/contraseña/i));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    const emailError = await screen.findByText(/El email es obligatorio/i);
    const passwordError = await screen.findByText(
      /La contraseña es obligatoria/i
    );

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
