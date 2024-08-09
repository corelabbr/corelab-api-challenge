# CoreNotes - API

Esse projeto foi desenvolvido com NodeJs, Express, Vitest, Multer, Zod, Docker, PostgreSQL e Prisma. O projeto possui o CRUD para lidar com o gerenciamento de tarefas, também é possível anexar aquivos e marcar como favorito.

## Repositórios

- Repositório back-end: https://github.com/xmateusxsx/corelab-api-challenge

## Arquitetura

Esse projeto é Clean Architecture, segue os princípios SOLID e possui Patterns.

### Repository Pattern
Abstrai requisições para o banco de dados em arquivos separados. Esses repositórios estarão armazenados em `src/repositories`.

### Factory Pattern
Centraliza a montagem dos casos de uso em `src/lib/factories`, se em algum momento for necessário adicionar mais dependências ao caso de uso, adicionamos a esse factory, que irá refletir em toda a aplicação onde o caso de uso é utilizado.

### Folders
- `prisma` Armazena migrations e o schema necessário para criar tabelas no banco de dados
- `public/file` Armazena arquivos
- `src/entities` Armazena entidades
- `src/interfaces` Armazena interfaces
- `src/repositories` Armazena repositórios
- `src/routes` Armazena as rotas
- `src/lib/services` Armazena casos de uso
- `src/lib/factories` Armazena factories
- `src/lib/controllers` Armazena controladores
- `src/lib/services/tests` Armazena testes
- `src/lib/services/erros` Armazena erros

## End-Points

### POST
- `/task` Cria uma tarefa
- `/file` Faz upload de um arquivo para uma tarefa

### GET
- `/task` Retorna todas as tarefas que não foram marcadas como favoritas
- `/task/favorite` Retorna todas as tarefas marcadas como favoritas

### PUT
- `/task/edit` Edita uma tarefa
- `/task/favorite` Marca ou desmarca uma tarefa como favorito

### DELETE
- `/task` Deleta uma tarefa e todas as suas relações

## Getting Started

### Pré-requisitos
- Docker
- npm

### Start
- Siga o exemplo de `.env.example` e crie `.env`
- Rode `npm i` ou `npm install` para instalar dependências
- Rode `docker compose up` para criar um contêiner
- Rode `npx prisma migrate dev` para migrar tabelas para o banco de dados
- Rode `npm run start:dev` para iniciar
- Se você deseja visualizar o banco de dados, rode `npx prisma studio`

## Scripts

- Iniciar projeto: `npm run start:dev`
- Rodar testes: `npm run test`
- Rodar testes e visualizar cobertura: `npm run test:coverage`
