import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Dashboard from "../components/Dashboard/Dashboard";

vi.mock("../hooks/AuthContext", () => ({
  useAuth: () => ({ user: { uid: "123" } }),
}));

describe("Dashboard", () => {
  it('redirecciona al hacer click en "Cargar dinero"', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/home/carga-dinero"
            element={<h1>Página de carga de dinero</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Cargar dinero/i });
    fireEvent.click(button);

    expect(
      await screen.findByText(/Página de carga de dinero/i)
    ).toBeInTheDocument();
  });
});
