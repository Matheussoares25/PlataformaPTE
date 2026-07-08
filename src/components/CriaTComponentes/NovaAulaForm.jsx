export default function NovaAulaForm({ criarnovaaula, moduloSelecionado }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nome = formData.get("nome");
    const conteudo = formData.get("conteudo");
    const url = formData.get("video"); 

    criarnovaaula({ nome, conteudo, url});
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0" style={{ borderRadius: "14px" }}>
        <div className="card-header bg-primary text-white fw-semibold" style={{ borderRadius: "14px 14px 0 0" }}>
          <i className="fa-solid fa-circle-play me-2"></i>
          Aula cadastrada no Modulo: <strong>{moduloSelecionado.modulo?.nome}</strong>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nome da Aula</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              placeholder="Digite o nome da aula..."
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Vídeo atual:</label>
              <br />
              <video controls>Seu navegador não suporta vídeo.</video>

              <div className="mb-3 mt-3">
                <label className="form-label fw-semibold">Enviar Vídeo da Aula</label>
                <input type="file" accept="video/*" name="video" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">Descrição Atual</label>
                <textarea className="form-control" rows="3" disabled></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">Descrição</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="conteudo"
                  placeholder="Digite uma breve descrição do conteúdo da aula..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success px-4">
              <i className="fa-solid fa-check me-1"></i>
              Salvar Aula
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}