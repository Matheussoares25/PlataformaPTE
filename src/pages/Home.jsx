import Api from '../services/EndPoint';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/Home.css";

function Home() {
    const tipo = localStorage.getItem('tipo');

    const navigate = useNavigate();

    const perfil = async () => {

    }

    return (
        <div className=" home-page align-items-center">
            <div className="container">
                <div className="row g-4">

                    <Link to="/Noticias" className="col-6 col-md-3">
                        <div className="menuOption text-center p-4 d-block">
                            <img src="/newspaper-regular.png" className="menuIcon" />
                            <h5 className="card-title">Notícias e vagas</h5>
                        </div>
                    </Link>

                    <Link to="/certificados" className="col-6 col-md-3">
                        <div className="menuOption text-center p-4 d-block">
                            <img src="/award-solid (2).png" className="menuIcon" />
                            <h5 className="card-title">Certificados</h5>
                        </div>
                    </Link>

                    <div className="col-6 col-md-3">
                        <div href="ranking.html" className="menuOption text-center p-4 d-block">
                            <img src="/ranking-star-solid (2).png" className="menuIcon" />
                            <h5 className="card-title">Ranking</h5>
                        </div>
                    </div>
                    
                    <Link to="/treinamentos" className="col-6 col-md-3">
                        <div  className="menuOption text-center p-4 d-block">
                            <img src="/person-chalkboard-solid (2).png" className="menuIcon" />
                            <h5 className="card-title">Meus Treinamentos</h5>
                        </div>
                    </Link>

                    {(tipo == 2 || tipo == 3) && (
                        <div className="col-6 col-md-3 btnadimin">
                            <a href="desempenho.html" className="menuOption text-center p-4 d-block">
                                <img src="/tachograph-digital-solid.png" className="menuIcon" />
                                <h5 className="card-title">Dashboard</h5>
                            </a>
                        </div>
                    )}

                    <div className="col-6 col-md-3">
                        <a onClick={perfil} className="menuOption text-center p-4 d-block">
                            <img src="/user-gear-solid.png" className="menuIcon" />
                            <h5 className="card-title">Perfil</h5>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
