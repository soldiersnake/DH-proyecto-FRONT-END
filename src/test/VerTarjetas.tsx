import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

describe("Dashboard", () => {
  it('navega a "payment-method" al hacer click en "Ver tarjetas"', () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route
            path="/home/payment-method"
            element={<div>Vista de tarjetas</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/ver tarjetas/i));

    expect(screen.getByText(/vista de tarjetas/i)).toBeInTheDocument();
  });
});
