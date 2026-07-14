import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login/login";
import Home from "./pages/Home/Home";
import Noticias from "./pages/Noticias/Noticias";
import Treinamento from "./pages/Menu_de_treinamentos/Treinamento";
import TreinamentoCreate from "./pages/Criacao_de_treinamentos/CriarTreinamento";
import Navbar from "./components/Navbar";
import TreinamentoSidebar from "./components/CriaTComponentes/TreinamentoSideBar";
import PrivateRoute from "./services/PrivateRoute";
import LoadingOverlay from "./components/LoadingOverlay";
import Dashboard from "./pages/Dashboard/Dashboard";
import Perfil from "./pages/Perfil/PerfilPage";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 850,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <BrowserRouter>
      <LoadingOverlay />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/Noticias"
          element={
            <PrivateRoute>
              <Navbar />
              <Noticias />
            </PrivateRoute>
          }
        />
        <Route
          path="/Treinamentos"
          element={
            <PrivateRoute>
              <Navbar />
              <Treinamento />
            </PrivateRoute>
          }
        />
        <Route
          path="/criarTreinamento"
          element={
            <PrivateRoute>
              <Navbar />
              <TreinamentoCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Perfil"
          element={
            <PrivateRoute>
              <Navbar />
              <Perfil />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
