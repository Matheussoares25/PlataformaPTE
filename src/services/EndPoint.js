

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
            throw new Error('Você não tem permissão para realizar esta operação.');
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