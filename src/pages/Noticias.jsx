import React, { useState, useEffect } from "react";
import Api from "../services/EndPoint";
import Swal from "sweetalert2";
import { swalDeleteVaga, swalDeleteNoticia } from "../components/Textings";
import "../css/Noticias.css";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [selecao, setSelecao] = useState([]);

  const itens = [
    ...noticias.map((n) => ({
      ...n,
      tipo: "noticia",
    })),

    ...vagas.map((v) => ({
      ...v,
      tipo: "vaga",
    })),
  ];
  useEffect(() => {
    carregarNoticias();
  }, []);

  const toggleSelecao = (id) => {
    setSelecao((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };
  const selecionarTodos = () => {
    if (selecao.length === noticias.length) {
      setSelecao([]); // já estão todos selecionados -> desmarca tudo
    } else {
      setSelecao(noticias.map((item) => item.id)); // marca todos
    }
  };
  const excluirSelecionados = async () => {
    if (selecao.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Nenhum item selecionado",
        text: "Selecione ao menos uma notícia para excluir.",
      });
      return;
    }

    const confirmacao = await Swal.fire({
      icon: "warning",
      title: `Excluir ${selecao.length} notícia(s)?`,
      text: "Essa ação não pode ser desfeita.",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacao.isConfirmed) return;

    try {
      // dispara todas as exclusões em paralelo
      await Promise.all(
        selecao.map((id) => Api.CallEndpoint("Noticia", "DELETE", null, id)),
      );

      Swal.fire({
        icon: "success",
        title: "Excluído!",
        text: "As notícias selecionadas foram excluídas.",
      });

      setSelecao([]);
      carregarNoticias();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível excluir uma ou mais notícias.",
      });
      setSelecao([]);
    }
  };

  async function carregarNoticias() {
    try {
      const [noticiasApi, vagasApi] = await Promise.all([
        Api.CallEndpoint("Noticia", "GET"),
        Api.CallEndpoint("Vagas", "GET"),
      ]);
      setNoticias(noticiasApi);
      setVagas(vagasApi);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Nao foi possivel carregar as noticias e vagas.",
      });
      window.location.href = "pageError.php";
    }
  }

  async function openAdd() {
    Swal.fire({
      title: "📰 Nova Notícia",
      width: 700,
      confirmButtonText: "Salvar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      html: `
         <div style="text-align:left;padding:10px;">           
             <div style="margin-bottom:15px;">

                 <label style="display:block;font-weight:600;margin-bottom:5px;">
                     Título
                 </label>

                 <input
                     type="text"
                     id="title"
                     class="swal2-input"
                     placeholder="Digite o título da notícia"
                     style="margin:0;width:100%;"
                 >
             </div>

             <div style="margin-bottom:15px;">
                 <label style="display:block;font-weight:600;margin-bottom:5px;">
                     Resumo
                 </label>

                 <textarea
                     id="summary"
                     class="swal2-textarea"
                     placeholder="Digite o resumo da notícia"
                     style="margin:0;width:100%;height:120px;"
                 ></textarea>
             </div>            

         </div>
     `,

      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          conteudo: document.getElementById("summary").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resposta = await Api.CallEndpoint("Noticia", "POST", {
            titulo: result.value.title,
            conteudo: result.value.conteudo,
          });
          Swal.fire({
            icon: "success",
            title: "Notícia adicionada!",
            text: "A notícia foi cadastrada com sucesso.",
          });
          carregarNoticias();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro ao adicionar notícia!",
            text: error.message,
          });
        }
      }
    });
  }
  async function openAddVaga() {
    Swal.fire({
      title: "📰 Nova Vaga",
      width: 700,
      confirmButtonText: "Criar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      html: `
<div style="text-align:left;padding:10px;">

    <div style="margin-bottom:15px;">
        <label style="display:block;font-weight:600;margin-bottom:5px;">
            Título da Vaga
        </label>

        <input
            type="text"
            id="title"
            class="swal2-input"
            placeholder="Digite o título da vaga"
            style="margin:0;width:100%;"
        >
    </div>

    <div style="margin-bottom:15px;">
        <label style="display:block;font-weight:600;margin-bottom:5px;">
            Descrição
        </label>

        <textarea
            id="summary"
            class="swal2-textarea"
            placeholder="Digite a descrição da vaga"
            style="margin:0;width:100%;height:120px;"
        ></textarea>
    </div>

    <div style="margin-bottom:15px;">
        <label style="display:block;font-weight:600;margin-bottom:5px;">
            Setor / Localização
        </label>

        <input
            type="text"
            id="localizacao"
            class="swal2-input"
            placeholder="Ex: TI, RH, Financeiro..."
            style="margin:0;width:100%;"
        >
    </div>

    <div style="margin-bottom:15px;">
        <label style="display:block;font-weight:600;margin-bottom:5px;">
            Quantidade de vagas
        </label>

        <input
            type="number"
            id="quantidade"
            class="swal2-input"
            min="1"
            placeholder="Ex: 5"
            style="margin:0;width:100%;"
        >
    </div>

    <div style="margin-top:20px;">
        <label style="display:flex;align-items:center;gap:10px;font-weight:600;">
            <input
                type="checkbox"
                id="ativo"
                checked
            >
            Vaga ativa
        </label>
    </div>

</div>
`,

      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          conteudo: document.getElementById("summary").value,
          localizacao: document.getElementById("localizacao").value,
          quantidade: document.getElementById("quantidade").value,
          ativo: document.getElementById("ativo").checked,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resposta = await Api.CallEndpoint("Vagas", "POST", {
            titulo: result.value.title,
            descricao: result.value.conteudo,
            localizacao: result.value.localizacao,
            quantidade: result.value.quantidade,
            ativo: result.value.ativo,
          });
          Swal.fire({
            icon: "success",
            title: "Vaga cadastrada!",
            text: "a vaga foi cadastrada com sucesso.",
          });
          carregarNoticias();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro ao adicionar Vaga!",
            text: error.message,
          });
        }
      }
    });
  }

  async function openEditnoticia(noticia) {
    // aceita objeto notícia para preencher o formulário
    if (!noticia) return;

    Swal.fire({
      title: "✏️ Editar Notícia",
      width: 700,
      confirmButtonText: "Salvar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      html: `
                <div style="text-align:left;padding:10px;">
                    <div style="margin-bottom:15px;">
                        <label style="display:block;font-weight:600;margin-bottom:5px;">Título</label>
                        <input type="text" id="titleEdit" class="swal2-input" value="${(noticia.titulo || "").replace(/"/g, '\"')}" style="margin:0;width:100%;">
                    </div>

                    <div style="margin-bottom:15px;">
                        <label style="display:block;font-weight:600;margin-bottom:5px;">Resumo</label>
                        <textarea id="summaryEdit" class="swal2-textarea" style="margin:0;width:100%;height:120px;">${(noticia.conteudo || "").replace(/</g, "&lt;")}</textarea>
                    </div>
                </div>
            `,
      preConfirm: () => {
        return {
          title: document.getElementById("titleEdit").value,
          conteudo: document.getElementById("summaryEdit").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Api.CallEndpoint(
            "Noticia",
            "PUT",
            {
              id: noticia.id,
              titulo: result.value.title,
              conteudo: result.value.conteudo,
            },
            noticia.id,
          );

          Swal.fire({
            icon: "success",
            title: "Notícia atualizada!",
            text: "As informações foram salvas.",
          });

          carregarNoticias();
        } catch (error) {
          console.error("Erro ao atualizar notícia:", error);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message,
          });
        }
      }
    });
  }

  async function openEditVaga(vaga) {
    // aceita objeto vaga para preencher o formulário
    if (!vaga) return;

    Swal.fire({
      title: "✏️ Editar Vaga",
      width: 700,
      confirmButtonText: "Salvar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      html: `
                <div style="text-align:left;padding:10px;">
                    <div style="margin-bottom:15px;">
                        <label style="display:block;font-weight:600;margin-bottom:5px;">Título</label>
                        <input type="text" id="titleEdit" class="swal2-input" value="${(vaga.titulo || "").replace(/"/g, '\"')}" style="margin:0;width:100%;">
                    </div>

                    <div style="margin-bottom:15px;">
                        <label style="display:block;font-weight:600;margin-bottom:5px;">Resumo</label>
                        <textarea id="summaryEdit" class="swal2-textarea" style="margin:0;width:100%;height:120px;">${(vaga.descricao || "").replace(/</g, "&lt;")}</textarea>
                    </div>

                    <div style="margin-bottom:15px;">
                        <label style="display:block;font-weight:600;margin-bottom:5px;">Localização</label>
                        <input type="text" id="localizacaoEdit" class="swal2-input" value="${(vaga.localizacao || "").replace(/"/g, '\"')}" style="margin:0;width:100%;">
                    </div>


        <div style="margin-bottom:15px;">
        <label style="display:block;font-weight:600;margin-bottom:5px;">
            Quantidade de vagas
        </label>

        <input
            type="number"
            id="quantidade"
            class="swal2-input"
            min="1"
            placeholder="Ex: 5"
            style="margin:0;width:100%;"
            value="${vaga.quantidade}"
        >
       
    </div>

                        <div style="margin-top:20px;">
        <label style="display:flex;align-items:center;gap:10px;font-weight:600;">
            <input
                type="checkbox"
                id="ativo"
                checked
            >
            Vaga ativa
        </label>
    </div>

                </div>    
            `,
      preConfirm: () => {
        return {
          title: document.getElementById("titleEdit").value,
          conteudo: document.getElementById("summaryEdit").value,
          localizacao: document.getElementById("localizacaoEdit").value,
          ativa: document.getElementById("ativo").checked,
          quantidade: document.getElementById("quantidade").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Api.CallEndpoint(
            "Vagas",
            "PUT",
            {
              id: vaga.id,
              titulo: result.value.title,
              descricao: result.value.conteudo,
              localizacao: result.value.localizacao,
              ativa: result.value.ativa,
              quantidade: result.value.quantidade,
            },
            vaga.id,
          );

          Swal.fire({
            icon: "success",
            title: "Vaga atualizada!",
            text: "As informações foram salvas.",
          });

          carregarNoticias();
        } catch (error) {
          console.error("Erro ao atualizar vaga:", error);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message,
          });
        }
      }
    });
  }

  async function openDeletenoticia(noticia) {
    Swal.fire(swalDeleteNoticia).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Api.CallEndpoint("Noticia", "DELETE", null, noticia.id);

          Swal.fire({
            icon: "success",
            title: "Notícia excluida!",
            text: "A noticia foi excluida com sucesso.",
          });

          carregarNoticias();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message,
          });
        }
      }
    });
  }

  async function openDeleteVaga(vaga) {
    Swal.fire(swalDeleteVaga).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Api.CallEndpoint("Vagas", "DELETE", null, vaga.id);

          Swal.fire({
            icon: "success",
            title: "Vaga excluida!",
            text: "A vaga foi excluida com sucesso.",
          });

          carregarNoticias();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message,
          });
        }
      }
    });
  }

  async function inscricao(item) {
    const usuarioId = localStorage.getItem("id");

    Swal.fire({
      title: "➕ Nova Candidatura",
      width: 700,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      html: `
<div class="container-fluid text-start">

    <div class="row mb-2">
        <div class="col-md-6">
            <label class="form-label">Vaga</label>
            <input class="form-control" value="${item.titulo || ""}" disabled>
        </div>
        <div class="col-md-6">
            <label class="form-label">Vaga ID</label>
            <input class="form-control" value="${item.id}" disabled>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-md-6">
            <label class="form-label">Nome</label>
            <input id="nome" class="form-control" placeholder="Seu nome">
        </div>

        <div class="col-md-6">
            <label class="form-label">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Seu email">
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-md-6">
            <label class="form-label">Telefone</label>
            <input id="telefone" class="form-control" placeholder="Seu telefone">
           
        </div>

        <div class="col-md-6">
            <label class="form-label">Currículo URL</label>
            <input id="curriculo_url" class="form-control" placeholder="Link do currículo">
        </div>
    </div>

</div>
        `,
      focusConfirm: false,

      preConfirm: () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const curriculo_url = document.getElementById("curriculo_url").value;

        return {
          vaga_id: item.id,
          usuario_id: usuarioId,
          nome,
          email,
          telefone,
          curriculo_url,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Api.CallEndpoint("Candidaturas", "POST", {
            vaga_id: result.value.vaga_id,
            usuario_id: result.value.usuario_id,
            nome: result.value.nome,
            email: result.value.email,
            telefone: result.value.telefone,
            curriculo_url: result.value.curriculo_url,
          });

          Swal.fire({
            icon: "success",
            title: "Candidatura enviada!",
            text: "Registro salvo com sucesso.",
          });
        } catch (error) {
          console.error(error);

          Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message,
          });
        }
      }
    });
  }

  return (
    <div className="noticias-page p-5">
      <div className="mb-4">
        <h2 className="card-title">Notícias e Vagas</h2>
        <div className="d-flex justify-content-end mb-4">
          {(localStorage.getItem("tipo") == 2 ||
            localStorage.getItem("tipo") == 3) && (
            <div className="toolbar-group" role="group">
              <button className="btn-pill btn-pill-primary" onClick={openAdd}>
                <i className="fas fa-newspaper me-2"></i>
                Notícia
              </button>

              <button className="btn-pill btn-pill-amber" onClick={openAddVaga}>
                <i className="fas fa-briefcase me-2"></i>
                Vaga
              </button>

              <button
                className="btn-pill btn-pill-danger"
                disabled={selecao.length === 0}
                onClick={excluirSelecionados}
              >
                <i className="fas fa-trash me-2"></i>
                Excluir ({selecao.length})
              </button>

              <button
                className="btn-pill btn-pill-ghost"
                onClick={selecionarTodos}
              >
                <i className="fas fa-check-square me-2"></i>
                {selecao.length === noticias.length
                  ? "Desmarcar"
                  : "Selecionar"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="row g-4">
        {itens.length > 0 ? (
          itens.map((item) => (
            <div
              key={item.id}
              className="col-md-6 col-lg-4"
              style={{
                opacity: item.tipo === "vaga" ? (item.ativa ? 1 : 0.5) : 1,
              }}
            >
              <div className="card noticia-card h-100">
                <div
                  className="card-body"
                  onDoubleClick={() =>
                    localStorage?.getItem("tipo") >= 2
                      ? item.tipo === "noticia"
                        ? toggleSelecao(item.id)
                        : inscricao(item)
                      : null
                  }
                  onContextMenu={(e) => {
                    if (localStorage?.getItem("tipo") >= 2) {
                      e.preventDefault();
                      console.log("Botão direito");
                      item.tipo === "noticia"
                        ? openEditnoticia(item)
                        : openEditVaga(item);
                    }
                  }}
                >
                  <div className="noticia-card-top">
                    {item.tipo === "noticia" && (
                      <div className="form-check noticia-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selecao.includes(item.id)}
                          onChange={() => toggleSelecao(item.id)}
                        />
                        <label className="form-check-label">Selecionar</label>
                      </div>
                    )}

                    <span
                      className={`badge-tag ${item.tipo === "noticia" ? "badge-tag-blue" : "badge-tag-green"}`}
                    >
                      {item.tipo === "noticia" ? "Notícia" : "Vaga"}
                    </span>
                  </div>

                  <h5 className="card-title">{item.titulo}</h5>

                  <p className="card-text">{item.conteudo || item.descricao}</p>
                  {item.tipo === "vaga" && (
                    <>
                      <p className="card-text">
                        Quantidade de vagas: {item.quantidade}
                      </p>
                      <h6 className="card-text">Setor: {item.localizacao}</h6>
                    </>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-end gap-2">
                  {(localStorage.getItem("tipo") == 2 ||
                    localStorage.getItem("tipo") == 3) && (
                    <button
                      className="btn-pill btn-pill-primary"
                      onClick={() =>
                        item.tipo === "noticia"
                          ? openEditnoticia(item)
                          : openEditVaga(item)
                      }
                    >
                      Editar
                    </button>
                  )}
                  {localStorage.getItem("tipo") == 3 && (
                    <button
                      className="btn-pill btn-pill-danger"
                      onClick={() =>
                        item.tipo === "noticia"
                          ? openDeletenoticia(item)
                          : openDeleteVaga(item)
                      }
                    >
                      Excluir
                    </button>
                  )}
                  {item.tipo === "vaga" && item.ativa && (
                    <button
                      className="btn-pill btn-pill-success"
                      onClick={() => inscricao(item)}
                    >
                      Inscrever-se
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="training-empty">
              <div className="training-empty-icon">📰</div>
              <h5>Nenhum registro encontrado</h5>
              <p>Assim que houver notícias ou vagas, elas aparecem aqui.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
