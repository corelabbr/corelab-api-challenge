# Resolução do Desafio - CoreLab

## Índice
1. [Descrição](#descrição)
2. [Como usar](#como-usar)
3. [Criação do banco de dados](#criação-do-banco-de-dados)
4. [Testes](#testes)
5. [Documentação](#documentação)

## Descrição
Este é um projeto de gestão de tarefas proposto pela empresa CoreLab em seu desafio de código. O projeto consiste no desenvolvimento de um aplicativo (front-end e back-end) que permite aos usuários gerenciar suas tarefas por meio de blocos de notas, possibilitando a criação, visualização, edição e exclusão de notas, além de classificá-las por cores e favoritos.

### Tecnologias Utilizadas
- NestJS
- Jest
- Postgres
- Typescript
- Husky

## Como usar

### Requisitos: 
- PostgreSQL
- Node.js

### Instalação
Clone o repositório:
```bash
git clone https://github.com/dev-Raffa/corenote-api.git
```
Acesse a pasta criada:
```bash
cd corenote-api
```
Instale as dependências:
```bash
npm install
```

## Criação do Banco de Dados
Crie o banco de dados PostgreSQL e configure as variáveis de ambiente:
```dotenv
# DATABASE
DB_TYPE=''
DB_HOST=''
DB_PORT=
DB_USERNAME=''
DB_PASSWORD=''
DB_NAME=''
```

## Testes
```bash
npm run test
```

## Documentação da API

### Retorna todas as Tarefas
- `GET /notes`

### Retorna uma Tarefa
- `GET /notes/${id}`

| Parâmetro | Tipo       | Descrição                          |
|-----------|------------|------------------------------------|
| id        | string     | Obrigatório. O ID do item que você quer |

### Criação da Tarefa
- `POST /notes`
  ```JSON
  {
    "title": "example",
    "content": "example",
    "colorOption": 2,
    "isFavorite": true
  }
  ```

| Parâmetro   | Tipo       | Descrição                          |
|-------------|------------|------------------------------------|
| title       | string     | Obrigatório. O título da tarefa desejada |
| content     | string ou blob     | Opcional. A descrição da tarefa |
| colorOption | number 0-12 | Obrigatório. Define a cor do PostIT | 
| isFavorite  | boolean    | Obrigatório. O usuário determina se a tarefa é favorita ou não |

### Deletar Tarefa
- `DELETE /notes/${id}`

| Parâmetro | Tipo       | Descrição                          |
|-----------|------------|------------------------------------|
| id        | string     | Obrigatório. ID do item que você quer |

### Atualizar Tarefa
- `PATCH /notes/${id}`
  ``` JSON
  {
    "title": "example",
    "content": "example",
    "colorOption": 2,
    "isFavorite": true 
  }
  ```
| Parâmetro   | Tipo       | Descrição                          |
|-------------|------------|------------------------------------|
| title       | string     | Opcional. O título da tarefa desejada |
| content     | string ou blob     | Opcional. A descrição da tarefa |
| colorOption | number 0-12 | Opcional. Define a cor do PostIT | 
| isFavorite  | boolean    | Opcional. O usuário determina se a tarefa é favorita ou não |


Links do projeto:
- [backend](https://github.com/dev-Raffa/corenote-api)
- [frontend](https://github.com/dev-Raffa/corenote-app)
- [site](https://job-test-xi.vercel.app/)
