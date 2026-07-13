import { useState, useEffect } from "react";
import Api from "../../services/EndPoint";

export default function AlunosCadastradosEmCurso() {
  const [alunosEmCurso, setAlunosEmCurso] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const matricula = await Api.CallEndpoint("UseTreinamentos", "GET");

        setAlunosEmCurso(matricula.length);
      } catch (err) {
      console.error(err);
            setErro("Não foi possível carregar os dados de alunos.");
      }
    
      finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  return (
    <div className="kpi-card kpi-amber">
      <div className="kpi-icon">
        <i className="fa-solid fa-user-graduate"></i>
      </div>
      <div>
        <p className="kpi-label">Alunos em curso</p>
        {carregando ? (
          <p className="kpi-value">Carregando...</p>
        ) : erro ? (
          <h6 className="kpi-value">{erro}</h6>
        ) : (
          <p className="kpi-value">{alunosEmCurso}</p>
        )}
      </div>
    </div>
  );
}