# Corelab API Challenge

Abaixo segue algumas decisões que tomei e funcionalidades da API.

Link do repositório de back end

- https://github.com/matheusnff85/corelab-api-challenge/

Link abaixo para o vídeo demonstrando e explicando sobre o app

- https://www.youtube.com/watch?v=cSbDV5AMkCE

## Stacks utilizadas

- **Node.js:** Ambiente de execução JavaScript no lado do servidor.
- **TypeScript:** Linguagem de programação.
- **Fastify:** Framework web para Node.js.
- **Zod:** Biblioteca para validação e esquemas de tipos em TypeScript/JavaScript.
- **Prisma:** ORM (Object-Relational Mapping) para trabalhar com bancos de dados.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
- **Docker:** Plataforma para criar, implantar e executar aplicações em contêineres.
- **Vitest:** Framework para realização dos testes.

## Decisões

- Decidi utilizar o Fastify como framework por ser uma aplicação simples que não necessita de um framework robusto como o NestJS. O Zod facilita a validação dos dados e se dá bem com o Fastify. O Prisma é bastante, mas BASTANTE simples de usar, e o Docker é utilizado para o container do PostgreSQL. O TypeScript é escolhido pela tipagem.

- Iniciei o desenvolvimento pelo backend por ser minha preferência e onde me desempenho melhor.

- Organizei as rotas em arquivos e suas validações em seus respectivos arquivos, a fim de facilitar a visualização e manutenção.

- Desenvolvi testes E2E para garantir o funcionamento correto da aplicação.

## Rodando localmente

**Clone o projeto**

```bash
  git clone git@github.com:matheusnff85/corelab-api-challenge.git
```

**Entre no diretório do projeto**

```bash
  cd corelab-api-challenge
```

**Instale as dependências**

```bash
  npm install
```

**Adicione as variaveis de ambiente**

- **Alternativa 1 -** Mude o nome do arquivo `.env.example` localizado na raiz do projeto para somente `.env`

- **Alternativa 2 -** Crie um novo `.env` na raiz do projeto e cole a linha abaixo dentro dele

```bash
DATABASE_URL="postgresql://root:docker@localhost:5432/corelabapi?schema=public"
```

**Inicie o container docker**

```bash
  docker-compose up
```

Ou caso queira visualizar os logs do container.

```bash
  docker-compose up -D
```

**Inicie o servidor**

```bash
  npm run start
```

## Documentação da API

![Imagem com as rotas da API](https://i.imgur.com/m1rlBpU.png)

### Retorna um array com todas as tarefas

```http
  GET /tasks
```

| Parâmetro | Tipo     | Descrição                                  |
| :-------- | :------- | :----------------------------------------- |
| `Nenhum`  | `Nenhum` | Não é necessário utilizar nenhum parâmetro |

#### Retorno

```json
[
  {
    "id": "a876ab10-5bda-41bc-a504-82bfaac5bce5",
    "title": "Ser Aprovado na Corelab",
    "content": "Finalizar o projeto e enviar.",
    "isFavorite": true,
    "color": "#8E3EF7",
    "createdAt": "2024-08-07T22:49:31.425Z"
  }
]
```

### Cria uma nova tarefa

```http
  POST /tasks
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `Nenhum`  | `Nenhum` | Todas as informações da tarefa são enviadas no body da requisição |

```json
{
  "title": "Ser Aprovado na Corelab",
  "content": "Finalizar o projeto e enviar.",
  "isFavorite": true,
  "color": "#8E3EF7"
}
```

#### Retorno

```json
{
  "taskId": "a876ab10-5bda-41bc-a504-82bfaac5bce5"
}
```

### Atualizar uma tarefa

```http
  PATCH /tasks/a876ab10-5bda-41bc-a504-82bfaac5bce5
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer atualizar |

Além do parâmetro, todas as informações para atualizar a tarefa são enviadas no body da requisição assim como na rota para criar uma nova tarefa.

#### Retorno

```json
{
  "message": "Tarefa atualizada com sucesso!"
}
```

### Exclui uma tarefa

```http
  DELETE /tasks/a876ab10-5bda-41bc-a504-82bfaac5bce5
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Retorno

```json
{
  "message": "Tarefa excluída com sucesso!"
}
```
