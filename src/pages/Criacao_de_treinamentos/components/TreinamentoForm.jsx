export default function TreinamentoForm({
  salvar,
  nome,
  setNome,
  editar,
  treinamentoSelecionado,
  excluirTreinamento,
  informacoesTreinamento,
}) {
  return (
    <div className="form-card">
      <h3>
        {editar
          ? `Editar Treinamento: ${treinamentoSelecionado?.nome}`
          : "Novo Treinamento"}
      </h3>

      <form onSubmit={salvar}>
        <input
          className="form-control mb-3"
          placeholder="Nome do treinamento"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-outline-training" type="submit">
            {editar ? "Editar" : "Salvar"}
          </button>

          {editar && (
            <div className="ms-auto">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={excluirTreinamento}
              >
                Excluir Treinamento
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm ms-2"
                onClick={() => informacoesTreinamento()}
              >
                Informações do Treinamento
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
