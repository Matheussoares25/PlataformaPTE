import Api from '../services/EndPoint';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";


import "../css/Treinamento.css";
export default function Treinamento() {
    const tipo = localStorage.getItem('tipo');

    const [treinamentos, setTreinamentos] = useState([]);
    const [userTreinamentos, setUserTreinamentos] = useState([]);


    async function carregarTreinamentos() {
        try {
            if (tipo == 1) {
                const response = await Api.CallEndpoint(
                    'Matriculas/Usuario',
                    'GET',
                    null,
                    localStorage.getItem('id')
                );

                setUserTreinamentos(response);
                return;
            }
            const response1 = await Api.CallEndpoint(
                'Matriculas/Usuario',
                'GET',
                null,
                localStorage.getItem('id')
            );

            const response = await Api.CallEndpoint('treinamento', 'GET');
            setTreinamentos(response);
            setUserTreinamentos(response1);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message
            });
        }
    }
    const dados = [
        ...(treinamentos?.map(t => ({
            id: t.id,
            nome: t.nome,
            criado: t.criado,
        })) || []),

        ...(userTreinamentos?.map(t => ({
            id: t.id,
            nome: t.nome,
            criado: t.criado,
        })) || [])
        
    ];



    useEffect(() => {
        carregarTreinamentos();
    }, []);



    return (
        <>
            {(tipo == 1 || tipo == 2 || tipo == 3) && (
                <div className="treinamento-page py-5 p-5 mt-0">
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <h2>Meus Treinamentos</h2>
                    </div>

                    <div className="row g-4">
                        {userTreinamentos.map((t) => (
                            <div key={t.id} className="col-md-6 col-lg-4">
                                <div className="card training-card h-100">
                                    <div className="card-body">
                                        <span className="badge badge-level mb-2">
                                            {t.id}
                                        </span>

                                        <h5 className="card-title">
                                            {t.nome}
                                        </h5>

                                        <p className="card-text">
                                            {t.criado}
                                        </p>
                                    </div>

                                    <div className="card-footer">
                                        <button className="btn btn-outline">
                                            Acessar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(tipo == 2 || tipo == 3) && (
                <div className="treinamento-page py-5 p-5 mt-0">
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <h2>Treinamentos</h2>
                    <Link to="/CriarTreinamento">
                        <button className="btn btn-outline-success" >
                            Novo Treinamento
                        </button>
                    </Link>
                    </div>

                    <div className="row g-4">
                        {treinamentos.map((t) => (
                            <div key={t.id} className="col-md-6 col-lg-4">
                                <div className="card training-card h-100">
                                    <div className="card-body">
                                        <span className="badge badge-level mb-2">
                                            {t.id}
                                        </span>

                                        <h5 className="card-title">
                                            {t.nome}
                                        </h5>

                                        <p className="card-text">
                                            {t.criado}
                                        </p>
                                    </div>

                                    <div className="card-footer">
                                        <Link to={`/criarTreinamento`}>
                                        <button className="btn btn-outline-info">
                                            Editar
                                        </button>
                                        </Link>
                                         <button className="btn btn-outline ms-2">
                                            Cadastrados
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}