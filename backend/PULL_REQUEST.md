# Pull Request

## Descrição

Este Pull Request introduz a funcionalidade de gerenciamento de tarefas, permitindo aos usuários criar, ler, atualizar e excluir itens da lista de tarefas. O reposotório completo do projeto pode ser acessado em: https://github.com/jhondharkyson520/corelab

## O que foi feito

- **Backend**:
  - Adicionada API RESTfull para gerenciamento de tarefas.
  - Implementado CRUD (Create, Read, Update, Delete) de tarefas.
  - Para desenvolvimento agil de servidores HTTP foi usado o Express.
  - A integração com banco de dados foi feita atráves do Prisma ORM.
  - O banco de dados foi feito utilizando o PostgreSQL.
  - Para o controle de acesso a recursos de solicitações feitas em uma página web foi usado o CORS.

  ## Estrutura de Pastas

```bash
.
├── src
│   ├── controllers
│   │   
│   ├── prisma
│   │   
│   ├── services
│   │
│   ├── routes.ts
│   └── server.ts
└── 
```

## Docker

O projeto está configurado para ser executado via Docker Compose, o que facilita a configuração e o gerenciamento dos serviços necessários.

### Docker Compose

```yaml
version: '3.8'

services:
  db_postgres_core_note:
    image: postgres:16.3
    container_name: db_postgres_core_note
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: corenotes
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5434:5432"
    networks:
      - network_core_note
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
    ports:
      - "15433:80"
    networks:
      - network_core_note
    restart: unless-stopped

  backend_core_note:
    build: .
    container_name: backend_core_note
    environment:
      DATABASE_URL: "postgresql://postgres:${POSTGRES_PASSWORD}@db_postgres_core_note:5432/corenotes?schema=public"
    volumes:
      - .:/usr/app
    ports:
      - "3333:3333"
    networks:
      - network_core_note
    restart: unless-stopped

networks:
  network_core_note:

volumes:
  postgres_data:
```

### Dockerfile

O backend está configurado com o seguinte Dockerfile:

```dockerfile
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g prisma && npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm start"]
```

### Script de Inicialização

```bash
#!/bin/sh

if [ ! -f ".initialized" ]; then
  prisma generate
  prisma migrate dev
  touch .initialized
fi

npm start
```

## Instruções para Execução

### Backend

1. Clone o repositório:
    ```bash
    git clone https://github.com/jhondharkyson520/corelab.git
    cd backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados:
     Crie um arquivo `.env` na raiz do projeto `backend` com as seguintes variáveis:
   ```bash
   
    POSTGRES_PASSWORD="admin"

    PGADMIN_PASSWORD="admin"

    PGADMIN_EMAIL="admin@admin.com"

4. Inicie o backend e o banco de dados usando Docker Compose:
    ```bash
    docker-compose up
## Funcionalidades

- CRUD de tarefas
## Testes

- **Backend**: Acesse a API em [http://localhost:3333](http://localhost:3333) para testar as rotas.

## Modelagem de dados
- Diagrama de classes da aplicação

![Diagrama de classes](./assets/diagramClass.png)

