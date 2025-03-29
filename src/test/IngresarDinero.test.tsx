import { MemoryRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { AuthProvider } from "../hooks/AuthContext";

it('muestra el botón "Ingresar dinero" y responde al clic', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthProvider>
  );

  const button = screen.getByText(/Cargar dinero/i);
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
});
