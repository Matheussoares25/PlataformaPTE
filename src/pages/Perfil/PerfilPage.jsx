import { useState, useEffect } from "react";
import Api from "../../services/EndPoint";
import "../../css/Perfil.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [tipo, setTipo] = useState(null);
  const [souAdmin, setSouAdmin] = useState(false);
  const [ativo, setAtivo] = useState(null);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await Api.CallEndpoint("Usuarios/me", "GET");
        setUsuario(resposta);
        setNome(resposta.nome || "");
        setTelefone(resposta.telefone || "");
        setEmail(resposta.email || "");
        setSouAdmin(resposta.tipo === 3|| resposta.tipo === 2);
        setAtivo(resposta.ativo);
        setTipo(resposta.tipo);
      } catch (err) {
        console.error(err);
        setErro("Não foi possível carregar seus dados.");
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuario();
  }, []);

  const iniciais = usuario?.nome
    ? usuario.nome
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "U";

  const tipoLabel =
    {
      1: "Aluno",
      2: "Instrutor",
      3: "Administrador",
    }[usuario?.tipo] || "Usuário";

const handleSalvar = async () => {
  setSalvando(true);
  const id = usuario.id;

  try {
    if (souAdmin) {
        await Api.CallEndpoint(`Usuarios`, "PUT", { nome, telefone, email, tipo, ativo }, id);
    } else {
      await Api.CallEndpoint(`Usuarios/me`, "PUT", { nome, telefone, email });
    }

    setUsuario((prev) => ({
      ...prev,
      nome,
      telefone,
      email,
      tipo: souAdmin ? tipo : prev.tipo,
      ativo: ativo,
    }));

    setEditando(false);
  } catch (err) {
    console.error(err);
    setErro("Não foi possível salvar as alterações.");
  } finally {
    setSalvando(false);
  }
};

  if (carregando) {
    return (
      <div className="perfil-page">
        <div className="training-empty">
          <div className="training-empty-icon">⏳</div>
          <h5>Carregando perfil...</h5>
        </div>
      </div>
    );
  }

  if (erro && !usuario) {
    return (
      <div className="perfil-page">
        <div className="training-empty">
          <div className="training-empty-icon">⚠️</div>
          <h5>{erro}</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <div className="perfil-glow-a" />
      <div className="perfil-glow-b" />

      <div className="perfil-header">
        <div>
          <p className="perfil-eyebrow">Minha conta</p>
          <h1 className="page-title">Perfil</h1>
        </div>
      </div>

      <div className="perfil-grid">
        {/* ---------- Cartão principal ---------- */}
        <div className="perfil-panel perfil-main">
          <div className="perfil-avatar-row">
            <div className="perfil-avatar">{iniciais}</div>
            <div>
              <h3 className="perfil-nome">{usuario?.nome}</h3>
              <span className="perfil-tipo-badge">{tipoLabel}</span>
            </div>
          </div>

          <div className="perfil-fields">
            <div className="perfil-field">
              <label>Nome</label>
              {editando ? (
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              ) : (
                <p>{usuario?.nome}</p>
              )}
            </div>

            <div className="perfil-field">
              <label>Email</label>
              {editando ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p>{usuario?.email}</p>
              )}
            </div>

            <div className="perfil-field">
              <label>Telefone</label>
              {editando ? (
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              ) : (
                <p>{usuario?.telefone || "Não informado"}</p>
              )}
            </div>

            <div className="perfil-field">
              <label>Conta criada em</label>
              <p className="perfil-field-static">
                {usuario?.data_criacao
                  ? new Date(usuario.data_criacao).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          </div>

          {erro && <p className="perfil-erro">{erro}</p>}

          <div className="perfil-actions">
            {editando ? (
              <>
                <button
                  className="btn-pill btn-pill-ghost"
                  onClick={() => {
                    setEditando(false);
                    setNome(usuario?.nome || "");
                    setTelefone(usuario?.telefone || "");
                  }}
                  disabled={salvando}
                >
                  Cancelar
                </button>
                <button
                  className="btn-pill btn-pill-primary"
                  onClick={handleSalvar}
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              </>
            ) : (
              <button
                className="btn-pill btn-pill-primary"
                onClick={() => setEditando(true)}
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        {/* ---------- Cartão lateral: resumo ---------- */}
        <div className="perfil-panel perfil-side">
          <div className="panel-header">
            <h5>Resumo da conta</h5>
          </div>

          <div className="perfil-summary-item">
            <span className="perfil-summary-label">Nível de acesso</span>
       
              <span className="perfil-summary-value">{tipoLabel}</span>
        
          </div>

          <div className="perfil-summary-item">
            <span className="perfil-summary-label">Status</span>
            {editando && souAdmin ? (
              <select
                className="perfil-select"
                value={ativo}
                onChange={(e) => setAtivo(Number(e.target.value))}
              >
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
              </select>
            ) : (
              <span className="perfil-summary-value">
                {usuario?.ativo ? "Ativo" : "Inativo"}
              </span>
            )}
            <span
              className={`perfil-status ${usuario?.ativo === 1 ? "perfil-status-ativo" : "perfil-status-inativo"}`}
            >
              {usuario?.ativo ? "Ativo" : "Inativo"}
            </span>
          </div>

          <div className="perfil-summary-item">
            <span className="perfil-summary-label">ID do usuário</span>
            <span className="perfil-summary-value">#{usuario?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
