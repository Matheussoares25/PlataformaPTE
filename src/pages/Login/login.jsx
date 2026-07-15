import Api from "../../services/AuthService";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { termoDeUso } from "../../components/Textings";
import React, { useState, useEffect } from "react";

import "../../css/login.css";

function Login() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const fazerLogin = async (e) => {
          setloading(true);
    e.preventDefault();

    const email = e.target.email.value;
    const senha = e.target.senha.value;

    try {

      const resposta = await Api.CallEndpoint("auth/login", "POST", {
        email,
        senha,
      });

      if (resposta.successo) {
        localStorage.setItem("token", resposta.token);
        localStorage.setItem("id", resposta.usuario.id);
        localStorage.setItem("tipo", resposta.usuario.tipo);
        localStorage.setItem("nome", resposta.usuario.nome);
        setloading(false);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Login efetuado com sucesso!",
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          navigate("/Home");
        });
      }

      if (resposta?.termosPendentes) {
        setloading(false);
        Swal.fire({
          icon: "warning",
          title: "Termos de Uso",
          width: 1200,
          html: termoDeUso,
          confirmButtonText: "Aceitar",
          showCancelButton: true,
          cancelButtonText: "Recusar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                setloading(true);
              await Api.CallEndpoint("auth/AtualizarAcesso", "PUT", { email });
                setloading(false);
              Swal.fire({
                icon: "success",
                title: "Termos de Uso Aceitos",
                text: "Seus termos de uso foram aceitos com sucesso.",
              }).then(() => {
                fazerLogin(e);
              });
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Erro",
                text: `${error.message}`,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Termos de Uso Recusados",
              text: "Para prosseguir aceite os termos de uso.",
            });
          }
        });
      }
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-panel" data-aos="fade-up">
        <div className="login-form-wrapper">
          <div className="login-brand-mark">PTE</div>

          <h1>Bem-vindo de volta</h1>
          <p className="login-subtitle text-white">
            Entre com sua conta para continuar
          </p>

          <form onSubmit={fazerLogin} className="login-form">
            <label className="login-field">
              <span>Email</span>
              <input name="email" type="email" placeholder="voce@email.com" />
            </label>

            <label className="login-field">
              <span>Senha</span>
              <input name="senha" type="password" placeholder="••••••••" />
            </label>

            <div className="d-flex justify-content-center align-items-center">
              {loading && (
                <div
                  className="spinner-border text-primary loading"
                  role="status"
                  style={{ width: "20px", height: "20px" }}
                >
                  <span className="visually-hidden">Carregando...</span>
                </div>
              )}
            </div>

            <a className="login-forgot" href="#">
              Esqueceu a senha?
            </a>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>

      <div className="login-showcase" data-aos="fade-left">
        <div className="login-showcase-glow" />

        <img
          className="login-showcase-logo"
          src="/Marca-1 (2).png"
          alt="Logo"
        />

        <div className="login-showcase-content" data-aos="fade-left">
          <h2>Sua Plataforma de Treinamento.</h2>
          <p>Acesse sua conta e continue de onde parou.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
