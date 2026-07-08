export default function TreinamentoSidebar({
  treinamentos,
  novoTreinamento,
  openEditTreinamento,
  abrirModulo,
  abrirAula,
}) {
  return (
    <aside className="training-sidebar">
      <div className="sidebar-header">
        <h5>Treinamentos</h5>

        <button className="btn btn-accent" onClick={novoTreinamento}>
          + Treinamento
        </button>
      </div>

      <div className="tree">
        {treinamentos.map((treinamento) => (
          <div key={treinamento.id} className="tree-item">
            <div
              className="tree-training"
              onClick={() => openEditTreinamento(treinamento)}
            >
              📚 {treinamento.nome}
            </div>

            {treinamento.modulos?.map((modulo) => (
              <div key={modulo.id} className="tree-module">
                <div
                  className="tree-training"
                  onClick={() => abrirModulo(modulo.id)}
                >
                  📁 {modulo.nome}
                </div>

                {modulo.aulas?.map((aula) => (
                  <div
                    key={aula.id}
                    className="tree-lesson"
                    onClick={() => abrirAula(aula.id)}
                  >
                    🎬 {aula.nome}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
