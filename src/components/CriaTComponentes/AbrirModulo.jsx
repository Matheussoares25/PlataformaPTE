import Api from "../../services/EndPoint";
export default function AbrirModulo({
  abrirModulo,
  id,
  moduloSelecionado,
  novaAula,
  excluirAula
}) {


  return (
    <div className="form-card mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          Aulas Cadastradas Em {moduloSelecionado.modulo.nome}
        </h4>

        <button
          type="button"
          className="btn btn-success btn-sm "
          onClick={() => novaAula(moduloSelecionado)}
        >
          + Nova Aula
        </button>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Aula</th>
            <th>Descrição</th>
            <th width="180">Ações</th>
          </tr>
        </thead>

        <tbody>
          {moduloSelecionado.aula?.length > 0 ? (
            moduloSelecionado.aula.map((aula) => (
              <tr key={aula.id}>
                <td>{aula.id}</td>

                <td>{aula.nome}</td>

                <td>{aula.conteudo}</td>

                <td>
                  <button type="button" className="btn btn-primary btn-sm me-2">
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirAula(aula.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Nenhuma aula cadastrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
