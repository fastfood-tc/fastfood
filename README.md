# FastFood API 🍔

API REST para sistema de autoatendimento de lanchonete, desenvolvida em TypeScript com NestJS e arquitetura hexagonal. Projeto da Fase 1 do SOAT Tech Challenge.

## 🚀 Tecnologias

- **Backend**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker

## 📋 Pré-requisitos

- Node.js (v22.16.0 ou superior)
- Docker e Docker Compose
- npm

## 🔧 Instalação local para desenvolvimento

1. Clone o repositório
```bash
git clone https://github.com/fastfood-tc/fastfood.git
cd fastfood
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Inicie apenas o banco de dados PostgreSQL
```bash
docker compose up postgres -d
```

5. Popule o banco com dados iniciais
```bash
npm run seed:build
```

6. Inicie o servidor em modo desenvolvimento (com hot-reload)
```bash
npm run start:dev
```

## 🐳 Simulando Produção

Para simular um ambiente de produção, você pode usar o Docker Compose para subir toda a aplicação:

```bash
# Clone o repositório
git clone https://github.com/fastfood-tc/fastfood.git
cd fastfood

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie todos os serviços (API + PostgreSQL)
docker compose up -d
```

## 📚 Documentação

A API estará disponível em `http://localhost:3000` e a documentação em `http://localhost:3000/docs`.

## 🏗️ Arquitetura

O projeto segue a Arquitetura Hexagonal (Ports & Adapters) com os seguintes módulos:

- **Customers**: Gestão de clientes
- **Products**: Catálogo de produtos
- **Orders**: Processamento de pedidos
- **Payments**: Integração com gateway de pagamento

## 🛠️ Scripts Disponíveis

- `npm run start:dev`: Inicia o servidor em modo desenvolvimento (com hot-reload)
- `npm run build`: Compila o projeto
- `npm run start:prod`: Inicia o servidor em modo produção
- `npm run seed:build`: Popula o banco com dados iniciais
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código

## 🔄 Melhorias Futuras

- Implementação de testes unitários e e2e
- Autenticação e autorização (JWT)
- Frontend em React/Next.js
- CI/CD com GitHub Actions

## 📝 Licença

Este projeto foi desenvolvido como parte do SOAT Tech Challenge.