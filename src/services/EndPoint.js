import Swal from "sweetalert2";





class Api {


    static async CallEndpoint(setor, method, body = null, id = null) {

        const token = localStorage.getItem('token');

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        let url = `https://localhost:7284/api/${setor}`;

        if (id !== null) {
            url += `/${id}`;
        }
        const response = await fetch(url, options);

        if (response.status === 400) {
            const erro = await response.json();
            throw new Error(`Erro ${response.status}: ${erro.message}`);
        }


        if (response.status === 204) {
            return null;
        }
        if (response.status === 403) {
            let erro = {};

            try {
                erro = await response.json();
            } catch {
                // resposta sem corpo
            }

            if (erro?.message?.includes('Nenhuma licença atribuída ao usuário.')) {
                throw new Error('Você não possui uma licença ativa.');
            }

            throw new Error(
                erro?.message || 'Você não tem permissão para realizar esta operação.'
            );
        }

        if (response.status === 401) {
            localStorage.clear();
            throw new Error('Sua sessão expirou, faca login novamente.');

        }

        if (!response.ok) {
            const erro = await response.json();

            if (erro.message.includes('aceite os Termos para prosseguir')) {
                return {
                    termosPendentes: true,
                    mensagem: erro.message
                };
            }

        }


        return await response.json();
    }

}



export default Api;