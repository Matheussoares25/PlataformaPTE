import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Api from "../services/EndPoint";
import { useNavigate } from "react-router-dom";
import "../css/TreinamentoCreate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { erro, sucesso } from "../components/icones";
import TreinamentoSidebar from "../components/CriaTComponentes/TreinamentoSideBar";
import TreinamentoForm from "../components/CriaTComponentes/TreinamentoForm";
import ModulosTabela from "../components/CriaTComponentes/ModulosTabela";
import AbrirModulo from "../components/CriaTComponentes/AbrirModulo";
import NovaAulaForm from "../components/CriaTComponentes/NovaAulaForm";

export default function TreinamentoCreate() {
  const [treinamentos, setTreinamentos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [treinamentoSelecionado, setTreinamentoSelecionado] = useState(null);
  const [moduloSelecionado, setModuloSelecionado] = useState(null);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [aulanova, setNovaAula] = useState(false);

  async function abrirAula(id) {
    const dados = await Api.CallEndpoint("Aulas", "GET", null, id);
  }
  async function carregarTreinamentos() {
    try {
      const response = await Api.CallEndpoint("Treinamento/Completo", "GET");
      setTreinamentos(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message,
      });
    }
  }

  async function openEditTreinamento(treinamento) {
    setModuloSelecionado(null);
    setNovaAula(null);

    setEditar(true);
    setId(treinamento.id);
    setNome(treinamento.nome);
    setTreinamentoSelecionado(treinamento);
  }
  async function abrirModulo(id) {
    const dados = await Api.CallEndpoint("Modulos", "GET", null, id);
    setNovaAula(null);
    setModuloSelecionado(dados);
  }

  async function novoTreinamento() {
    setEditar(false);
    setTreinamentoSelecionado(null);
    setModuloSelecionado(null);
  }
  async function novoModulo(treinamentoSelecionado) {
    Swal.fire({
      title: "📰 Novo Modulo",
      text: "Digite o nome do modulo",
      html: `<input type="text" id="swal-input1" class="swal2-input" placeholder="Digite o nome do modulo">`,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          treinamento: treinamentoSelecionado.id,
          nome: document.getElementById("swal-input1").value,

          treinamentoId: treinamentoSelecionado.id,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Api.CallEndpoint("Modulos", "POST", {
            treinamento_id: result.value.treinamento,
            nome: result.value.nome,
          });
          Swal.fire({
            icon: "success",
            title: "Modulo criado!",
            text: "O modulo foi criado com sucesso.",
          });
          carregarTreinamentos();
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

  async function novaAula() {
    setNovaAula(true);
  }

  const criarnovaaula = async ({ nome, conteudo, url }) => {
    try {
      const res = await Api.CallEndpoint("Aulas", "POST", {
        nome,
        conteudo,
        modulo_id: moduloSelecionado.modulo.id,
        midia_url: "",
      });

      if (res) {
        Swal.fire({
          icon: "success",
          title: "Aula criada!",
          text: "A aula foi criada com sucesso.",
        });
        carregarTreinamentos(); // ou o que for equivalente aqui
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível criar a aula.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message,
      });
    }
  };

  //Exclusões
  async function excluirTreinamento() {
    Swal.fire({
      icon: "question",
      title: "Excluir Treinamento",
      text: "Tem certeza que deseja excluir o treinamento?",
      html: `<b>${nome}</b> sera excluido e todas aulas vinculadas ao treinamento serão excluidas.`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Nao",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Api.CallEndpoint(
            "Treinamento",
            "DELETE",
            null,
            id,
          );
          Swal.fire({
            icon: "success",
            title: "Treinamento excluido!",
            text: "O treinamento foi excluido com sucesso.",
          });
          setNome("");
          setEditar(false);
          carregarTreinamentos();
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
  async function excluirModulo(id) {
    Swal.fire({
      icon: "question",
      title: "Excluir Modulo",
      text: "Tem certeza que deseja excluir o modulo?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Nao",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Api.CallEndpoint(
            "Modulos",
            "DELETE",
            null,
            id,
          );

          Swal.fire({
            icon: "success",
            title: "Modulo excluido!",
            text: "O modulo foi excluido com sucesso.",
          });
          carregarTreinamentos();
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
  const excluirAula = async (idAula) => {
    const resposta = await Swal.fire({
      icon: "question",
      title: "Excluir Aula",
      text: "Tem certeza que deseja excluir a aula?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Nao",
    });
    if (!resposta.isConfirmed) return;
    try {
      await Api.CallEndpoint("Aulas", "DELETE", null, idAula);
      abrirModulo(moduloSelecionado.modulo.id);
      carregarTreinamentos();
    } catch (error) {
      console.error(error);
    }
  };

  async function informacoesTreinamento() {

    const response = await Api.CallEndpoint(
      "Matriculas/treinamento",
      "GET",
      null,
      id,
    );

    Swal.fire({
      title: "📰 Informações do Treinamento",
      width: "900px",
      html: `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0;">Alunos Cadastrados</h3>
      <button 
        id="btnNovoAluno"
        style="
          background:#3085d6;
          color:white;
          border:none;
          padding:10px 15px;
          border-radius:5px;
          cursor:pointer;
        "
      >
        + Cadastrar Novo Aluno
      </button>
    </div>

    <div
      style="
        max-height:350px;
        overflow-y:auto;
        border:1px solid #ddd;
        border-radius:5px;
      "
    >
      <table style="width:100%; border-collapse:collapse;">
        <thead style="position:sticky; top:0; background:white;">
          <tr>
            <th style="border-bottom:1px solid #ddd; padding:10px;">ID</th>
            <th style="border-bottom:1px solid #ddd; padding:10px;">Nome</th>
            <th style="border-bottom:1px solid #ddd; padding:10px;">Email</th>
            <th style="border-bottom:1px solid #ddd; padding:10px;">Status</th>
          </tr>
        </thead>
        ${response.map(
        (aluno) =>
          `<tr>
            <td style="border-bottom:1px solid #ddd; padding:10px;">${aluno.usuario.id}</td>
            <td style="border-bottom:1px solid #ddd; padding:10px;">${aluno.usuario.nome}</td>
            <td style="border-bottom:1px solid #ddd; padding:10px;">${aluno.usuario.email}</td>
            <td style="border-bottom:1px solid #ddd; padding:10px;">${aluno.status == 1 ? `Ativo ${sucesso}` : `Inativo ${erro}`}</td>
            
          </tr>`,
      )}
        <tbody>
        </tbody>
      </table>
    </div>
  `,
      showConfirmButton: false,

      didOpen: () => {
        document
          .getElementById("btnNovoAluno")
          .addEventListener("click", async () => {
            const response = await Api.CallEndpoint("Usuarios", "GET");
            const usuarios = await response.json();

            const opcoes = {};

            usuarios.forEach(usuario => {
              opcoes[usuario?.id] = usuario.nome;
            });

            const { value: usuarioId } = await Swal.fire({
              title: "Nova matrícula de aluno",
              input: "select",
              inputOptions: opcoes,
              inputPlaceholder: "Selecione um aluno",
              showCancelButton: true,
              confirmButtonText: "Matricular",
              cancelButtonText: "Cancelar"
            });


          });
      },
    });
  }
  const salvar = async (e) => {
    e.preventDefault();

    const nome = e.target.nome.value;

    if (nome == "") {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Preencha o campo Nome",
      });
      return;
    }

    const res = editar
      ? await Api.CallEndpoint("Treinamento", "PUT", { nome }, id)
      : await Api.CallEndpoint("Treinamento", "POST", { nome });

    if (res) {
      Swal.fire({
        icon: "success",
        title: editar ? "Treinamento atualizado!" : "Treinamento criado!",
        text: editar
          ? "O treinamento foi atualizado com sucesso."
          : "O treinamento foi criado com sucesso.",
      });

      carregarTreinamentos();
      e.target.reset();
      setEditar(false);
      setId(null);
    }
  };

  useEffect(() => {
    carregarTreinamentos();
  }, []);

  return (
    <>
      <div className="training-layout">
        <TreinamentoSidebar
          treinamentos={treinamentos}
          novoTreinamento={novoTreinamento}
          openEditTreinamento={openEditTreinamento}
          abrirModulo={abrirModulo}
          abrirAula={abrirAula}
        />

        <main className="training-content">
          {!moduloSelecionado && (
            <TreinamentoForm
              salvar={salvar}
              nome={nome}
              setNome={setNome}
              editar={editar}
              treinamentoSelecionado={treinamentoSelecionado}
              excluirTreinamento={excluirTreinamento}
              informacoesTreinamento={informacoesTreinamento}
            />
          )}

          {treinamentoSelecionado && !moduloSelecionado && (
            <ModulosTabela
              treinamentoSelecionado={treinamentoSelecionado}
              novoModulo={novoModulo}
              excluirModulo={excluirModulo}
            />
          )}

          {moduloSelecionado && (
            <AbrirModulo
              abrirModulo={abrirModulo}
              id={moduloSelecionado.modulo.id}
              moduloSelecionado={moduloSelecionado}
              novaAula={novaAula}
              excluirAula={excluirAula}
            />
          )}
          {aulanova && moduloSelecionado && (
            <NovaAulaForm
              moduloSelecionado={moduloSelecionado}
              criarnovaaula={criarnovaaula}
            />
          )}
        </main>
      </div>
    </>
  );
}
