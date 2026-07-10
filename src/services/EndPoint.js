import Swal from "sweetalert2";

class Api {
    static async CallEndpoint(setor, method, body = null, id = null) {
        const token = localStorage.getItem("token");

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        let url = `https://localhost:7284/api/${setor}`;

        if (id !== null) {
            url += `/${id}`;
        }

        try {
            // Inicia o loading global
            window.dispatchEvent(new Event("loading:start"));

            const response = await fetch(url, options);

            if (response.status === 204) {
                return null;
            }

            if (response.status === 400) {
                const erro = await response.json();
                throw new Error(erro.message);
            }

            if (response.status === 401) {
                localStorage.clear();

                Swal.fire({
                    icon: "error",
                    title: "Sessão expirada",
                    text: "Faça login novamente."
                });

                window.location.href = "/";
                return;
            }

            if (response.status === 403) {
                let erro = {};

                try {
                    erro = await response.json();
                } catch {}

                throw new Error(
                    erro?.message ||
                    "Você não tem permissão para realizar esta operação."
                );
            }

            if (!response.ok) {
                const erro = await response.json();

                if (
                    erro?.message?.includes(
                        "aceite os Termos para prosseguir"
                    )
                ) {
                    return {
                        termosPendentes: true,
                        mensagem: erro.message
                    };
                }

                throw new Error(
                    erro?.message || "Erro ao processar solicitação."
                );
            }

            return await response.json();
        } catch (error) {
            console.error(error);

            throw error;
        } finally {
            // Finaliza o loading global
            window.dispatchEvent(new Event("loading:end"));
        }
    }
}

export default Api;