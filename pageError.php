<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acesso Negado</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #0d6efd, #0a58ca);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .error-card {
            max-width: 600px;
            width: 100%;
            border: none;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, .2);
        }

        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #dc3545;
            line-height: 1;
        }

        .error-icon {
            font-size: 4rem;
        }
    </style>
</head>

<body>

    <div class="card error-card p-4">

        <div class="card-body">

            <div class="error-icon mb-3">
                🚫
            </div>

            <div class="error-code">
                403
            </div>

            <h2 class="mt-3">Acesso Negado</h2>

            <p class="text-muted mt-3">
                Você não possui permissão para acessar esta página ou o link utilizado é inválido.
            </p>

            <div class="d-flex justify-content-center gap-2 mt-4">

                <button class="btn btn-primary"
                    onclick="window.location.href='/'">
                    Ir para Login
                </button>

                <button class="btn btn-outline-secondary"
                    onclick="history.back()">
                    Voltar
                </button>

            </div>

        </div>

    </div>

</body>

</html>