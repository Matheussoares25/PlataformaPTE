import { useState, useEffect } from "react";
import Api from "../../../services/EndPoint";
import Swal from "sweetalert2";

export default function ProvasRealizadas() {
 const [provasRealizadas, setProvasRealizadas] = useState([]);
 const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setCarregando(true);

            const provas = await Api.CallEndpoint("prova", "GET");
            setProvasRealizadas(provas.length);

        } catch (erro) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro ao carregar o número de provas realizadas.',
            });


        }finally {
            setCarregando(false);
        }
    }

    return (
        <div className="kpi-card kpi-indigo">
          <div className="kpi-icon">
            <i className="fa-solid fa-file-pen"></i>
          </div>
          <div>
            <p className="kpi-label">Provas Realizadas</p>
            {carregando ? (
              <p className="kpi-value">Carregando...</p>
            ) : ( 
               <h3 className="kpi-value">{provasRealizadas}</h3>
            )}
          </div>
        </div>
    )


}