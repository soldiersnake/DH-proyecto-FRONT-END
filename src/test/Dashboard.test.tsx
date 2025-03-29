// src/components/Dashboard/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthProvider } from "../hooks/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Dashboard", () => {
  it("muestra el título de dinero disponible", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Dinero disponible/i)).toBeInTheDocument();
  });
});
