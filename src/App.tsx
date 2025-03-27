import { ToastContainer } from "react-toastify";
import AppContent from "./AppContent";
import { AuthProvider } from "./hooks/AuthContext";
import { seedServices } from "./firebase/seedService";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    seedServices(); // se cargan datos semillas de servicios
  }, []);
  return (
    <>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;
