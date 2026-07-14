import { useState, useEffect } from "react";
import Api from "../../../services/EndPoint";

export default function CursosCriados() {
  const [cursosCriados, setCursosCriados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const criados = await Api.CallEndpoint("Treinamento", "GET");

        setCursosCriados(criados.length);
      } catch (err) {
      console.error(err);
            setErro("Não foi possível carregar os dados de cursos.");
      }
    
      finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  return (
    <div className="kpi-card kpi-red">
      <div className="kpi-icon">
        <i className="fa-solid fa-book"></i>
      </div>
      <div>
        <p className="kpi-label">Cursos Criados</p>
        {carregando ? (
          <p className="kpi-value">Carregando...</p>
        ) : erro ? (
          <h6 className="kpi-value">{erro}</h6>
        ) : (
          <p className="kpi-value">{cursosCriados}</p>
        )}
      </div>
    </div>
  );
}
