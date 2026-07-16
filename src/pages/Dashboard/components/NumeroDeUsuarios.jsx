import { useState, useEffect } from "react";
import Api from "../../../services/EndPoint";
import Swal from "sweetalert2";

export default function NumeroDeUsuarios() {
    const [numeroUsuarios, setNumeroUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
        setCarregando

            const usuarios = await Api.CallEndpoint("Usuarios", "GET");
            setNumeroUsuarios(usuarios.length);

        } catch (erro) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro ao carregar o número de usuários.',
            });


        }finally {
            setCarregando(false);
        }
    }

    return (
        <div className="kpi-card kpi-green">
            <div className="kpi-icon">
                <i className="fa-solid fa-users"></i>
            </div>
            <div>
                <p className="kpi-label">Número de Usuários</p>
                {carregando ? (
                    <p className="kpi-value">Carregando...</p>
                ) : (
                    <h3 className="kpi-value">{numeroUsuarios}</h3>
                )}
            </div>
        </div>
    )


}