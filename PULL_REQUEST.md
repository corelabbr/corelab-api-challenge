# CoreNotes Backend


## Deploy & Repositórios

- [Frontend](https://github.com/carls-rodrigues/clab-web-challenge)

- Em Produção --> [CoreNotes Backend live](https://corelab-api-challenge-pink.vercel.app/)


## Setup
1. Clonar o repositório:

```bash
git clone https://github.com/carls-rodrigues/corelab-api-challenge
cd clab-api-challenge
```

2. Instalar dependencias

```bash
npm install
```

3. Criar um arquivo '.env' na pasta raíz do projeto

```bash
CONNECTION_STRING=
```

4. Iniciar aplicação

```bash
npm run dev
```

## Table of Content:

- [Setup](#setup)
- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## About The App
  Essa aplicação foi contruída com Fastify, Docker, Postgres, Jest.

### Features

- **Criar Notas:** Add nova nota.
- **Editar & Deletar Notas:** Atualzar ou remover notas como necessário, dando o total controle sobre suas notas.
- **Responsive Design:** A aplicação é completamente responsiva.
- **Persistent Storage:** As notas são armazenadas usando uma api e cada usuário só tem acesso as suas notas criadas.
