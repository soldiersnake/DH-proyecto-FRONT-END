import { render, screen } from "@testing-library/react";
import Profile from "../components/Dashboard/Profile";
import { AuthProvider } from "../hooks/AuthContext";

describe("Profile", () => {
  it("muestra el título 'Tus datos'", () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    expect(screen.getByText(/Tus datos/i)).toBeInTheDocument();
  });
});
