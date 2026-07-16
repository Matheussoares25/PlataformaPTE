import "../../css/Dashboard.css";
import VagasChart from "./components/vagasGrafico";
import CursosCriados from "./components/CursosCriados";
import AlunosCadastradosEmCurso from "./components/AlunosEmCurso";
import NumeroDeUsuarios from "./components/NumeroDeUsuarios";
import ProvasRealizadas from "./components/ProvasRealizadas";
import Swal from "sweetalert2";
export default function Dashboard({ dados }) {
  // dados esperado: { totalUsuarios, treinamentosAtivos, certificadosEmitidos, taxaConclusao, desempenhoMensal, topUsuarios }
  const {
    cursosCriados = 5,
    noticias = 10,
    certificados = 5,
    problemasReportados = 580,
    vagasCriadas = 15,
    desempenhoMensal = [
      { mes: "Jan", valor: 10 },
      { mes: "abril", valor: 20 },
    ],
    topUsuarios = [2],
    dadosVagas = [{ mes: "jan", criadas: 10, candidaturas: 20 }],
  } = dados || {};

  const maiorValor = Math.max(...desempenhoMensal.map((d) => d.valor), 1);

  const maiorCandidaturas = Math.max(
    ...dadosVagas.map((d) => d.candidaturas),
    1,
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-glow-a" />
      <div className="dashboard-glow-b" />
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Visão geral</p>
          <h1 className="page-title">Dashboard</h1>
        </div>
        <span className="badge-custom">Atualizado agora</span>
      </div>
      {/* ---------- KPIs ---------- */}
      <div className="dashboard-kpis">
        <CursosCriados />
        <AlunosCadastradosEmCurso />
        <ProvasRealizadas />  
        <NumeroDeUsuarios />

        <div className="kpi-card kpi-cyan">
          <div className="kpi-icon">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div>
            <p className="kpi-label">Notícias</p>
            <h3 className="kpi-value">{noticias}</h3>
          </div>
        </div>

        <div className="kpi-card kpi-crimson">
          <div className="kpi-icon">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <p className="kpi-label">Certificados</p>
            <h3 className="kpi-value">{certificados}</h3>
          </div>
        </div>

        <div className="kpi-card kpi-orange">
          <div className="kpi-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <p className="kpi-label">Problemas Reportados</p>
            <h3 className="kpi-value">{problemasReportados}</h3>
          </div>
        </div>

        <div className="kpi-card kpi-pink">
          <div className="kpi-icon">
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <div>
            <p className="kpi-label">Vagas Criadas</p>
            <h3 className="kpi-value">{vagasCriadas}</h3>
          </div>
        </div>
      </div>
      {/* ---------- Gráfico + Ranking ---------- */}
      <div className="dashboard-grid">
        {/* ---------- Gráfico + Tabela ---------- */}
        <VagasChart
        />

        <div className="dashboard-panel">
          <div className="panel-header">
            <h5>Top usuários</h5>
            <span className="panel-sub">Por desempenho</span>
          </div>

          {topUsuarios.length > 0 ? (
            <ul className="ranking-list">
              {topUsuarios.map((u, i) => (
                <li className="ranking-item" key={u.id ?? i}>
                  <span className="ranking-position">{i + 1}º</span>
                  <span className="ranking-name">{u.nome}</span>
                  <span className="ranking-score">{u.pontuacao} pts</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="training-empty">
              <div className="training-empty-icon">🏆</div>
              <h5>Nenhum registro ainda</h5>
              <p>O ranking aparece quando houver usuários avaliados.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
