import Api from "../services/EndPoint";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {termoDeUso} from "../components/Textings";

function Login() {
    const navigate = useNavigate();
    


    const fazerLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const senha = e.target.senha.value;

        try {
            const resposta = await Api.CallEndpoint(
                "auth/login",
                "POST",
                { email, senha }
            );

            if (resposta.successo) {
                localStorage.setItem('token', resposta.token);
                localStorage.setItem('id', resposta.usuario.id);
                localStorage.setItem('tipo', resposta.usuario.tipo);

                navigate('/Home');
            }

            if (resposta?.termosPendentes) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Termos de Uso',
                    width: 1200,
                    html: termoDeUso,
                    confirmButtonText: 'Aceitar',
                    showCancelButton: true,
                    cancelButtonText: 'Recusar',

                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await Api.CallEndpoint("auth/AtualizarAcesso", "PUT", { email });

                            Swal.fire({
                                icon: 'success',
                                title: 'Termos de Uso Aceitos',
                                text: 'Seus termos de uso foram aceitos com sucesso.'
                            }).then(() => {
                                fazerLogin(e);
                            })
                        } catch (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erro',
                                text: `${error.message}`
                            })
                        }

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Termos de Uso Recusados',
                            text: 'Para prosseguir aceite os termos de uso.'
                        })
                    }
                })
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `${error.message}`
            });
        }

    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>

                <form onSubmit={fazerLogin}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        name="senha"
                        type="password"
                        placeholder="Senha"
                    />

                    <button type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;