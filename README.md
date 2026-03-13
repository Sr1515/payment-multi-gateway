# Payment Multi-Gateway API

Uma API de gerenciamento de transações desenvolvida com
**AdonisJS v6**, capaz de operar com **múltiplos gateways de
pagamento**, controle de **prioridades** e **sistema de reembolso
integrado**.

---

# 📋 Requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Docker e Docker Compose (Recomendado para ambiente completo)
- Node.js (v20.x ou superior, caso queira rodar localmente)
- Gerenciador de pacotes (npm ou pnpm)

---

# 🧰 Stack Tecnológica

Tecnologia Uso

---

**AdonisJS v6** Framework principal da API
**Node.js 20+** Runtime
**MySQL** Banco de dados
**Docker / Docker Compose** Ambiente containerizado
**Japa** Testes automatizados
**Makefile** Automação de comandos

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

Crie os arquivos:

    .env
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

Método Endpoint Descrição Acesso

---

POST /auth/signup Cadastro de usuário Público
POST /auth/login Login e geração de token Público
POST /auth/logout Revogação de token Autenticado

---

# 💳 Transações

Responsável pelo processamento de pagamentos.

---

Método Endpoint Descrição Permissão

---

POST /transactions Criar nova Autenticado
transação

POST /transactions/reembolso Reembolso de ADMIN, FINANCE
transação

GET /transactions Listar transações ADMIN, FINANCE

GET /transactions/:id Detalhes da ADMIN, FINANCE
transação

---

---

# ⚙️ Gateways

Gerenciamento dos gateways de pagamento.

Método Endpoint Descrição Permissão

---

GET /gateways Listar gateways ADMIN
PATCH /gateways/:id/activate Ativar gateway ADMIN
PATCH /gateways/:id/deactivate Desativar gateway ADMIN
PATCH /gateways/:id/priority Alterar prioridade ADMIN

---

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

Role Permissões

---

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

Comando Descrição

---

make build Build das imagens docker
make run Inicia containers
make run-logs Inicia containers com logs
make off Para containers
make off-clean Remove containers e volumes
make migrations Executa migrations
make tests Executa testes
make log-transaction-service Logs da API
make log-payment-db Logs do banco

---
