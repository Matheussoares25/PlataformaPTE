export default function ModulosTabela({
    treinamentoSelecionado,
    novoModulo,
    excluirModulo

}){
    return(
                    <div className="form-card mt-4 ">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">
                  Modulos Cadastrados Em {treinamentoSelecionado.nome}
                </h4>

                <button
                  type="button"
                  className="btn btn-success btn-sm "
                  onClick={() => novoModulo(treinamentoSelecionado)}
                >
                  + Novo Módulo
                </button>
              </div>

              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Aulas</th>
                    <th width="180">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {treinamentoSelecionado.modulos?.length > 0 ? (
                    treinamentoSelecionado.modulos.map((modulo) => (
                      <tr key={modulo.id}>
                        <td>{modulo.id}</td>

                        <td>{modulo.nome}</td>

                        <td>{modulo.aulas?.length || 0}</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => excluirModulo(modulo.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Nenhum módulo cadastrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    )
}