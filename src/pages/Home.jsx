import Api from "../services/EndPoint";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { mostrarPerfil } from "../components/Perfil";

import "../css/Home.css";

function Home() {
  const tipo = localStorage.getItem("tipo");
  const NomeUsuario = localStorage.getItem("nome");

  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-glow-a" />
      <div className="home-glow-b" />

      <div className="home-header">
        <div>
          <p className="home-greeting-eyebrow">Painel</p>
          <h1 className="page-title">
            Olá, bem-vindo de volta "{NomeUsuario}"
          </h1>
        </div>
        <div className="home-header-right">
          <span className="badge-custom">
            Nível {tipo == 1 ? "Aluno" : "Admin"}
          </span>
          <div className="home-avatar-chip" title="Meu perfil">
            <span
              class="btn text-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              {NomeUsuario.slice(0, 2)}
            </span>
          </div>
        </div>
      </div>
      <div
        class="offcanvas offcanvas-end bg-dark"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">
            {NomeUsuario}
            <br />
            {new Date().toLocaleTimeString()}
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="offcanvas-menu">
            <Link
              to="/perfil"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Meu Perfil</span>
            </Link>

            <Link
              to="/treinamentos"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Treinamentos</span>
            </Link>

            <Link
              to="/certificados"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Certificados</span>
            </Link>

            <Link
              to="/ranking"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Ranking</span>
            </Link>

            <Link
              to="/ajuda"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Ajuda </span>
            </Link>

            <Link
              to="/Reportes"
              className="offcanvas-menu-item"
              data-bs-dismiss="offcanvas"
            >
              <span>Reportes</span>
            </Link>
          </div>
        </div>
        <div class="offcanvas-body">...</div>
      </div>

      <div className="home-grid" data-aos="fade-left">
        <Link to="/Noticias" className="menuOption card-cyan">
          <div className="menuIcon-chip">
            <img src="/newspaper-regular.png" className="menuIcon" />
          </div>
          <h5 className="card-title">Notícias e vagas</h5>
          <p className="menuOption-sub">Atualizações e oportunidades</p>
        </Link>

        <Link
          to="/certificados"
          className="menuOption card-amber"
          data-aos="fade-left"
        >
          <div className="menuIcon-chip">
            <img src="/award-solid (2).png" className="menuIcon" />
          </div>
          <h5 className="card-title">Certificados</h5>
          <p className="menuOption-sub">Seu histórico de conquistas</p>
        </Link>

        <div className="menuOption card-azul span-2" data-aos="fade-left">
          <div className="menuIcon-chip">
            <img src="/ranking-star-solid (2).png" className="menuIcon" />
          </div>
          <h5 className="card-title">Ranking</h5>
          <p className="menuOption-sub">Veja sua posição entre os colegas</p>
        </div>

        <Link
          to="/treinamentos"
          className="menuOption card-emerald"
          data-aos="fade-left"
        >
          <div className="menuIcon-chip">
            <img src="/person-chalkboard-solid (2).png" className="menuIcon" />
          </div>
          <h5 className="card-title">Meus Treinamentos</h5>
          <p className="menuOption-sub">Continue de onde parou</p>
        </Link>

        {(tipo == 2 || tipo == 3) && (
          <Link
            to="/desempenho"
            className="menuOption card-rose span-2"
            data-aos="fade-left"
          >
            <div className="menuIcon-chip">
              <img src="/tachograph-digital-solid.png" className="menuIcon" />
            </div>
            <h5 className="card-title">Dashboard</h5>
            <p className="menuOption-sub">Indicadores e desempenho da equipe</p>
          </Link>
        )}

        <div
          className="menuOption card-slate"
          onClick={mostrarPerfil}
          role="button"
          tabIndex={0}
        >
          <div className="menuIcon-chip">
            <img src="/user-gear-solid.png" className="menuIcon" />
          </div>
          <h5 className="card-title">Perfil</h5>
          <p className="menuOption-sub">Dados e preferências da conta</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
