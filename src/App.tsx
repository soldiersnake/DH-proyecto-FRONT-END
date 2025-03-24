import { ToastContainer } from "react-toastify";
import AppContent from "./AppContent";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
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
