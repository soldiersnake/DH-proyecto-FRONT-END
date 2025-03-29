import { MemoryRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../../hooks/AuthContext";

it("muestra el CVU del usuario si está presente", () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthProvider>
  );

  const cvuElement = screen.getByText(/cvu/i);
  expect(cvuElement).toBeInTheDocument();
});
