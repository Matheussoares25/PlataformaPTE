import { Link } from 'react-router-dom';


function Navbar() {
  const logout = () => {
      localStorage.removeItem('token');
      localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-3">

        <Link
          className="navbar-brand fw-bold text-white"
          to="/Home"
          style={{ fontSize: '22px' }}
        >
          PTE
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav align-items-lg-center gap-lg-3">

            <Link
              className="nav-link text-white fw-semibold"
              to="/treinamentos"
            >
              Treinamentos
            </Link>

            <div className="dropdown">
              <a
                className="nav-link text-white fw-semibold dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Desempenho
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/desempenho">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/avaliacoes">
                    Avaliações / Correção
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/vagas">
                    Vagas
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              className="nav-link text-white fw-semibold"
              to="/ranking"
            >
              Ranking
            </Link>

            <Link
              className="nav-link text-white fw-semibold"
              to="/noticias"
            >
              Notícias
            </Link>

            <Link
              className="nav-link text-white fw-semibold"
              to="/certificados"
            >
              Certificados
            </Link>

            <div className="dropdown">
              <a
                className="nav-link text-white dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Conta
              </a>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={logout}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;