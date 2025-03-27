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

import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Dashboard/Profile";
import { PaymentMethod } from "./components/Dashboard/paymentMethod";
import AddCard from "./components/Dashboard/AddCard";
import IngresoDineroHome from "./components/Dashboard/IngresoDInero/IngresoDineroHome";
import TransferenciaMethod from "./components/Dashboard/IngresoDInero/TransferenciaMethod";
import TarjetaMethod from "./components/Dashboard/IngresoDInero/TarjetaMethod";
import IngresoMonto from "./components/Dashboard/IngresoDInero/IngresoMonto";
import ResumenIngreso from "./components/Dashboard/IngresoDInero/ResumenIngreso";
import Activity from "./components/Dashboard/Activity";
import { PayService } from "./components/Dashboard/pagarServicios/PayService";

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
      <main>
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
            <Route path="pay-service" element={<PayService />} />
            <Route path="carga-dinero" element={<IngresoDineroHome />} />
            <Route path="transferencia" element={<TransferenciaMethod />} />
            <Route path="tarjeta" element={<TarjetaMethod />} />
            <Route path="payment-method" element={<PaymentMethod />} />
            <Route path="cargar-dinero/monto" element={<IngresoMonto />} />
            <Route path="cargar-dinero/resumen" element={<ResumenIngreso />} />
            <Route path="add-card" element={<AddCard />} />
          </Route>

          {/* Ruta fallback */}
          <Route path="*" element={<div>404 | Página no encontrada</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppContent;
