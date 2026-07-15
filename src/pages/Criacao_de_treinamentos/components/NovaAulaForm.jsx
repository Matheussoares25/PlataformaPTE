import { useState } from "react";

export default function NovaAulaForm({ criarnovaaula, moduloSelecionado }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  // Gera um preview local (não é o vídeo em base64, só pra visualização instantânea)
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    setErro(null);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    // limite básico de tamanho, já que vai virar base64 e ir pro banco
    const MAX_MB = 50;
    if (file.size > MAX_MB * 1024 * 1024) {
      setErro(`O vídeo excede o limite de ${MAX_MB}MB.`);
      e.target.value = "";
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Converte o arquivo de vídeo em Base64 para envio/salvamento
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Falha ao ler o arquivo de vídeo."));
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    const formData = new FormData(e.target);
    const nome = formData.get("nome");
    const conteudo = formData.get("conteudo");
    const videoFile = formData.get("video");

    let videoBase64 = null;

    try {
      if (videoFile && videoFile.size > 0) {
        setEnviando(true);
        videoBase64 = await fileToBase64(videoFile);
      }

      await criarnovaaula({
        nome,
        conteudo,
        video: videoBase64, // string base64 (ou null se nenhum vídeo foi selecionado)
      });

      e.target.reset();
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setErro("Não foi possível salvar a aula. Tente novamente.");
    } finally {
      setEnviando(false);
    }
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
              <label className="form-label fw-semibold">
                {previewUrl ? "Prévia do vídeo selecionado:" : "Nenhum vídeo selecionado ainda"}
              </label>
              <br />
              {previewUrl && (
                <video controls width="100%" src={previewUrl}>
                  Seu navegador não suporta vídeo.
                </video>
              )}

              <div className="mb-3 mt-3">
                <label className="form-label fw-semibold">Enviar Vídeo da Aula</label>
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  className="form-control"
                  onChange={handleVideoChange}
                />
                {erro && (
                  <div className="text-danger small mt-1">{erro}</div>
                )}
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
            <button type="submit" className="btn btn-success px-4" disabled={enviando}>
              {enviando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Enviando vídeo...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check me-1"></i>
                  Salvar Aula
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}