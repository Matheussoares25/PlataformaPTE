import Swal from "sweetalert2";
import Api from "../services/EndPoint";

export const mostrarPerfil = async () => {
    try {
        const usuario = await Api.CallEndpoint("usuarios/me", "GET");

        Swal.fire({
            title: "Meu Perfil",
            html: `
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Tipo:</strong> ${usuario.tipo}</p>
            `,
            icon: "info"
        });
    } catch {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Não foi possível carregar o perfil."
        });
    }
};