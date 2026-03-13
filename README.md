# Payment Multi-Gateway API

Uma API de gerenciamento de transações desenvolvida com **AdonisJS v6**,
capaz de operar com **múltiplos gateways de pagamento**, controle de
**prioridades** e **sistema de reembolso integrado**.

---

# 📂 Estrutura do Projeto

```bash
├── .env.example
├── compose.yaml
├── Makefile
└── transaction-service
    ├── app
    ├── config
    ├── database
    ├── start
    ├── tests
    ├── .env.example
    └── .env.test.example
```

---

# ⚙️ Requisitos

Antes de iniciar, instale:

- **Docker**
- **Docker Compose**
- **Node.js 20+** (opcional para rodar local sem docker)
- **npm ou pnpm**
- **make**

---

# 🚀 Instalação

## 1️⃣ Clonar repositório

```bash
git clone <url-do-seu-repositorio>
cd payment-multi-gateway
```

---

## 2️⃣ Configurar variáveis de ambiente

Crie o arquivo na raiz do projeto:

    .env

Baseados nos arquivos:

    .env.example

---

Crie os arquivos na pasta /transaction-service:

    transaction-service/.env
    transaction-service/.env.test

Baseados nos arquivos:

    .env.example
    .env.test.example

---

## 3️⃣ Build da aplicação

```bash
make build
```

---

## 4️⃣ Subir containers

```bash
make run
```

Serviços iniciados:

- API
- MySQL
- Mock de Gateways

---

## 5️⃣ Executar migrations

```bash
make migrations
```

---

# 🌐 URL da API

    http://localhost:3000/api/v1

---

# 🔐 Sistema de Autenticação

A API utiliza **token-based authentication**.

| Método | Endpoint       | Descrição                | Acesso      |
| :----- | :------------- | :----------------------- | :---------- |
| POST   | `/auth/signup` | Cadastro de usuário      | Público     |
| POST   | `/auth/login`  | Login e geração de token | Público     |
| POST   | `/auth/logout` | Revogação de token       | Autenticado |

---

# 💳 Transações

Responsável pelo processamento de pagamentos.

| Método | Endpoint                  | Descrição              | Permissão          |
| :----- | :------------------------ | :--------------------- | :----------------- |
| POST   | `/transactions`           | Criar nova transação   | Autenticado        |
| POST   | `/transactions/reembolso` | Reembolso de transação | **ADMIN, FINANCE** |
| GET    | `/transactions`           | Listar transações      | **ADMIN, FINANCE** |
| GET    | `/transactions/:id`       | Detalhes da transação  | **ADMIN, FINANCE** |

---

# ⚙️ Gateways

Gerenciamento dos gateways de pagamento.

| Método | Endpoint                   | Descrição          | Permissão |
| :----- | :------------------------- | :----------------- | :-------- |
| GET    | `/gateways`                | Listar gateways    | **ADMIN** |
| PATCH  | `/gateways/:id/activate`   | Ativar gateway     | **ADMIN** |
| PATCH  | `/gateways/:id/deactivate` | Desativa gateway   | **ADMIN** |
| PATCH  | `/gateways/:id/priority`   | Alterar prioridade | **ADMIN** |

# 👥 Usuários, Clientes e Produtos

### Usuários e Clientes

Gerenciamento permitido para:

- **ADMIN**
- **MANAGER**

### Produtos

Podem ser criados ou editados por:

- **ADMIN**
- **MANAGER**
- **FINANCE**

---

# 🛡 Sistema de Permissões (RBAC)

## Role Permissões

**ADMIN** Controle total do sistema
**MANAGER** Gerenciamento de usuários e clientes
**FINANCE** Gerenciamento de produtos e reembolsos
**USER** Operações básicas

---

# 🧪 Testes

O projeto utiliza **Japa**.

Para executar:

```bash
make tests
```

O ambiente de testes utiliza um **banco MySQL isolado** definido no
`compose.yaml`.

---

# 🛠 Comandos Makefile

Atalhos para facilitar o desenvolvimento:

| Comando                        | Descrição                                 |
| :----------------------------- | :---------------------------------------- |
| `make build`                   | Build das imagens Docker                  |
| `make run`                     | Inicia containers em background           |
| `make run-logs`                | Inicia containers exibindo logs           |
| `make off`                     | Para os containers                        |
| `make off-clean`               | Remove containers e volumes (Limpa banco) |
| `make migrations`              | Executa migrations no banco               |
| `make tests`                   | Executa testes automatizados (Japa)       |
| `make log-transaction-service` | Exibe logs apenas da API                  |
| `make log-payment-db`          | Exibe logs apenas do banco MySQL          |
