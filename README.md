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

# 📂 Organização do Projeto

A estrutura de pastas do projeto é organizada da seguinte forma:

```bash
├── .env.example          # Exemplo de variáveis de ambiente
├── compose.yaml          # Arquivo de orquestração do Docker
├── Makefile              # Atalhos para comandos comuns
└── transaction-service   # Código-fonte da API AdonisJS
    ├── app               # Lógica de negócio (Controllers, Models, Validators, etc.)
    ├── config            # Configurações do framework
    ├── database          # Migrations e seeders
    ├── start             # Inicialização (Rotas, Middleware)
    ├── tests             # Testes de sistema
    └── .env.example      # Variáveis de ambiente específicas da API
    └── .env.test.example # Variáveis de ambiente específicas do banco de testes
```

---

# 🚀 Como instalar e rodar o projeto

O projeto está totalmente **containerizado** e pré-configurado para
facilitar a inicialização utilizando o Docker.

## 1. Clone o repositório

```bash
git clone <url-do-seu-repositorio>
cd payment-multi-gateway
```

## 2. Configure as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto baseado no `.env.example`.

Crie também o arquivo `.env` dentro da pasta:

    transaction-service/

baseado no exemplo existente.

Crie também o arquivo `.env.test` dentro da pasta:

    transaction-service/

baseado no exemplo existente.

## 3. Build o projeto e suba os containers via Docker

```bash
make build
```

```bash
make run
```

Isso iniciará:

- MySQL
- Mock de Gateways
- Serviço da API

## 4. Execute as Migrations

```bash
make migrations
```

## 5. Acesse a API

A API estará disponível em:

    http://localhost:3000/api/v1/

---

# 🛤 Detalhamento de Rotas

Todas as rotas são prefixadas por:

    /api/v1/

---

# 🔐 Autenticação

Método Rota Descrição Acesso

---

POST /auth/signup Cadastro de novo usuário Público
POST /auth/login Login e geração de token Público
POST /auth/logout Revogação do token Autenticado

---

# 💳 Transações (Transactions)

---

Método Rota Descrição Acesso

---

POST /transactions Realiza uma nova Autenticado
compra

POST /transactions/reembolso Estorna uma ADMIN, FINANCE
transação via  
 Gateway

GET /transactions Lista todas as ADMIN, FINANCE
transações

GET /transactions/:id Detalhes de uma ADMIN, FINANCE
transação

---

---

# ⚙️ Gateways

---

Método Rota Descrição Acesso

---

GET /gateways Lista gateways ADMIN
cadastrados

PATCH /gateways/:id/activate Ativa um gateway ADMIN
para uso

PATCH /gateways/:id/deactivate Desativa um ADMIN
gateway

PATCH /gateways/:id/priority Altera a ADMIN
prioridade de  
 execução

---

---

# 👥 Usuários, Clientes e Produtos

**Usuários / Clientes**

Gerenciamento restrito a:

- ADMIN
- MANAGER

**Produtos**

Criação e edição permitida para:

- ADMIN
- MANAGER
- FINANCE

---

# 🛠 Comandos Úteis (Makefile)

O projeto conta com comandos facilitados via **make** para gerenciamento
do ambiente Docker.

---

Comando Descrição

---

make build Recontrói as imagens do Docker
Compose

make run Sobe todos os containers em
background

make run-logs Sobe containers e mostra logs no
terminal

make off Para e remove containers e redes

make off-clean Para e remove containers, redes e
volumes (limpa o banco)

make migrations Executa as migrations dentro do
container

make tests Executa todos os testes
automatizados

make log-transaction-service Mostra logs do serviço da API

make log-payment-db Mostra logs do banco de dados

---

---

# 💡 Informações Relevantes

## 🛡️ Sistema de Permissões

A API utiliza um middleware de **roles** para garantir segurança:

- **ADMIN** → Acesso total ao sistema
- **FINANCE** → Transações, reembolsos e relatórios de produtos
- **MANAGER** → Gestão de usuários e clientes
- **USER** → Acesso limitado ao restante das funcionalidades

---

# 🔄 Lógica de Multi-Gateway

Durante a criação de uma transação:

    POST /transactions

O sistema:

1.  Busca todos os gateways **ativos**
2.  Ordena pela **prioridade**
3.  Tenta executar no **gateway principal**
4.  Caso falhe, tenta automaticamente no **próximo gateway**

Isso garante **maior taxa de conversão de pagamentos**.

---

# 🧪 Testes

O projeto utiliza o framework **Japa** para testes automatizados.

O ambiente de testes sobe um **banco MySQL dedicado** (definido no
`compose.yaml`) garantindo que os dados de:

- desenvolvimento
- produção

**não sejam afetados** durante a execução dos testes.

---
