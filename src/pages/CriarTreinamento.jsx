import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Api from "../services/EndPoint";
import { Await, useNavigate } from 'react-router-dom';
import "../css/TreinamentoCreate.css";

export default function TreinamentoCreate() {
    const [treinamentos, setTreinamentos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [treinamentoSelecionado, setTreinamentoSelecionado] = useState(null);

    async function abrirAula(id){
        const dados = await Api.CallEndpoint('Aulas/modulo', 'GET', null, id);
    }


    async function carregarTreinamentos() {
        try {
            const response = await Api.CallEndpoint('Treinamento/Completo', 'GET');
            setTreinamentos(response);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message
            });
        }
    }


    async function openEditTreinamento(treinamento) {
        setEditar(true);
        setId(treinamento.id);
        setNome(treinamento.nome);
        setTreinamentoSelecionado(treinamento);
    }

    function novoTreinamento() {
        setEditar(false);
    }
    async function excluirTreinamento() {
        Swal.fire({
            icon: 'question',
            title: 'Excluir Treinamento',
            text: 'Tem certeza que deseja excluir o treinamento?',
            html: `<b>${nome}</b> sera excluido e todas aulas vinculadas ao treinamento serão excluidas.`,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Nao'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Api.CallEndpoint('Treinamento', 'DELETE', null, id);
                    Swal.fire({
                        icon: 'success',
                        title: 'Treinamento excluido!',
                        text: 'O treinamento foi excluido com sucesso.'
                    })
                    setNome("");
                    setEditar(false);
                    carregarTreinamentos();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: error.message
                    });
                }
            }
        })
    }

    useEffect(() => {
        carregarTreinamentos();
    }, []);


    const salvar = async (e) => {
        e.preventDefault();

        const nome = e.target.nome.value;

        if (nome == '') {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Preencha o campo Nome'
            })
            return
        }

        const metodo = editar ? "PUT" : "POST";

        switch (metodo) {
            case "POST":
                const res1 = await Api.CallEndpoint("Treinamento", "POST", { nome });


                if (res1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Treinamento criado!',
                        text: 'O treinamento foi criado com sucesso.'
                    })
                    carregarTreinamentos();
                    e.target.reset();

                    setEditar(false);
                    setId(null);
                }

                break;
            case "PUT":
                const res2 = await Api.CallEndpoint("Treinamento", "PUT", { nome }, id);

                if (res2) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Treinamento atualizado!',
                        text: 'O treinamento foi atualizado com sucesso.'
                    })
                    carregarTreinamentos();
                    e.target.reset();

                    setEditar(false);
                    setId(null);
                }

                break;
        }



    };

    
    return (
        <>



            <div className="training-layout">

                <aside className="training-sidebar">

                    <div className="sidebar-header">
                        <h5>Treinamentos</h5>

                        <button
                            className="btn btn-accent" onClick={() => novoTreinamento()}>
                            + Treinamento
                        </button>
                    </div>

                    <div className="tree">

                        {treinamentos.map(treinamento => (
                            <div key={treinamento.id} className="tree-item">

                                <div className="tree-training" onClick={() => openEditTreinamento(treinamento)}>
                                    📚 {treinamento.nome}
                                </div>

                                {treinamento.modulos?.map(modulo => (
                                    <div key={modulo.id} className="tree-module">
                                        <div key={modulo.id}
                                            onClick={() => abrirModulo(modulo.id)}
                                        
                                        >

                                            📁 {modulo.nome}
                                        </div>

                                        {modulo.aulas?.map(aula => (
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

                <main className="training-content">

                    <div className="form-card">

                        <h3>
                            {editar ? "Editar Treinamento" : "Novo Treinamento"}
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

                                <button
                                    type="button"
                                    className="btn btn-accent"
                                >
                                    Adicionar Módulo
                                </button>

                                <button
                                    className="btn btn-outline-training"
                                    type="submit"
                                >
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
                                    </div>
                                )}

                            </div>

                        </form>

                    </div>

                    {treinamentoSelecionado && (

                        <div className="form-card mt-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h4 className="mb-0">
                                    Modulos Cadastrados Em {treinamentoSelecionado.nome}
                                </h4>

                                <button
                                    type="button"
                                    className="btn btn-success btn-sm "
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

                                        treinamentoSelecionado.modulos.map(modulo => (

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
                                                    >
                                                        Excluir
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >
                                                Nenhum módulo cadastrado
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </main>


            </div>

        </>
    );
}
