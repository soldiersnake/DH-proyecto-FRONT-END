import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import Header from "./components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-16">
        {" "}
        {/* Padding-top para no ocultar contenido */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
