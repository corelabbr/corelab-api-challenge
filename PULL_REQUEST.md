# ToDo API

API REST para gerenciar tarefas, permitindo criar, listar, atualizar, deletar e marcar como favorito.

---

## Tecnologias utilizadas

- **Node.js**: ambiente de execução do JavaScript  
- **Express.js**: framework para criar o servidor e rotas  
- **TypeScript**: tipagem estática para maior segurança  
- **MySQL2**: conexão com banco de dados MySQL  
- **dotenv**: gerenciamento de variáveis de ambiente  
- **express-validator**: validação de dados recebidos na API  

---

## Estrutura do projeto

project/
│
├─ src/
│ ├─ controllers/ # Lógica das rotas
│ │ └─ taskController.ts
│ ├─ models/ # Interfaces e modelos
│ │ └─ task.ts
│ ├─ routes/ # Definição das rotas
│ │ └─ taskRoutes.ts
│ ├─ server/ # Inicialização do servidor
│ │ └─ server.ts
│ └─ database/ # Conexão com banco de dados
│ └─ connection.ts
│
└─ index.ts # Ponto de entrada do projeto


## Configuração

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco



2. Instale as dependências:


npm install
ou, se usar yarn:



yarn install

Rode o projeto em modo de desenvolvimento:

node --require ts-node/register src/index.ts


Endpoints da API
Listar tarefas
GET /tasks

Query params opcionais:

favorite (boolean): filtra por favoritos

color (string): filtra por cor

Exemplo de resposta:

json
Copiar código
[
  {
    "id": 1,
    "title": "Comprar leite",
    "description": "Ir ao supermercado",
    "completed": false,
    "favorite": true,
    "color": "blue"
  }
]
Criar tarefa
POST /tasks

Body (JSON):

json
Copiar código
{
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false,
  "favorite": false,
  "color": "red"
}
Resposta:

json
Copiar código
{
  "id": 2,
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false,
  "favorite": false,
  "color": "red"
}
Atualizar tarefa
PUT /tasks/:id

Body (JSON) com campos parciais:

json
Copiar código
{
  "title": "Tarefa atualizada",
  "completed": true
}
Resposta:

json
Copiar código
{
  "message": "Tarefa atualizada"
}
Deletar tarefa
DELETE /tasks/:id

Resposta:

Status 204 No Content (sem corpo)

Alternar favorito
PATCH /tasks/:id/favorite

Resposta:

json
Copiar código
{
  "message": "Favorito alternado"
}
Validações
title é obrigatório e deve ser uma string

description, completed, favorite e color são opcionais

completed e favorite devem ser booleanos, se enviados

Observações
O projeto utiliza conexão pool com MySQL para eficiência

Todas as respostas de erro retornam JSON com message e error

A API pode ser facilmente expandida para autenticação, paginação e filtros adicionais

Recomenda-se testar a API usando ferramentas como Postman ou Insomnia

Exemplo de uso no Postman
GET http://localhost:3000/tasks → Lista todas as tarefas

POST http://localhost:3000/tasks → Cria nova tarefa

PUT http://localhost:3000/tasks/:id → Atualiza tarefa

DELETE http://localhost:3000/tasks/:id → Deleta tarefa

PATCH http://localhost:3000/tasks/:id/favorite → Alterna favorito