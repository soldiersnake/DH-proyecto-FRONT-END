// AppContent.tsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import Landing from "./pages/Landing";
import Header from "./components/common/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { useAuth } from "./hooks/AuthContext";
import Loader from "./components/common/Loader";
import { PaymentMethods } from "./components/Dashboard/PaymentMethods";
import { Profile } from "./components/Dashboard/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import { Card } from "./components/Dashboard/Card";
import { Activity } from "./components/Dashboard/Activity";

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* Sub-rutas accesibles desde Home (dashboard) */}
            <Route index element={<Dashboard />} />
            <Route path="activity" element={<Activity />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payments" element={<PaymentMethods />} />
            <Route
              path="carga-dinero"
              element={<div>Ingresar dinero (pendiente)</div>}
            />
            <Route path="card" element={<Card />} />
          </Route>

          {/* Ruta fallback */}
          <Route path="*" element={<div>404 | Página no encontrada</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppContent;
