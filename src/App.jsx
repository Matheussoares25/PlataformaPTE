import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Login from "./pages/login";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Treinamento from "./pages/Treinamento";
import TreinamentoCreate from "./pages/CriarTreinamento";
import Navbar from "./components/Navbar";
import TreinamentoSidebar from "./components/CriaTComponentes/TreinamentoSideBar";
import PrivateRoute from "./services/PrivateRoute";

import "./App.css";

function App() {



  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/Noticias"
          element={
            <PrivateRoute>
              <Noticias />
            </PrivateRoute>
          }
        />
        <Route
          path="/Treinamentos"
          element={
            <PrivateRoute>
              <Treinamento />
            </PrivateRoute>
          }
        />
        <Route
          path="/criarTreinamento"
          element={
            <PrivateRoute>
              <TreinamentoCreate />
            </PrivateRoute>
          }
        />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
