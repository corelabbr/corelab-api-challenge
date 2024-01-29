# Resolução do Desafio - CoreLab

### Índice
<ul>
  <a href="#descrição"><li>Descrição</li></a>
  <a href="#instalação"><li>Instalação</li></a>
  <a href="#criação-do-banco-de-dados"><li>Criação do Banco de Dados</li></a>
  <a href="#testes"><li>Testes</li></a>
  <a href="#estrutura-do-projeto"><li>Estrutura do Projeto</li></a>
  <a href="#documentação-da-api"><li>Documentação da API</li></a>
</ul>

### Descrição
Este projeto foi desenvolvido como resolução para um desafio Full Stack da empresa CoreLab.

### Instalação 
##### Clone o repositório:
```
$ git clone git@github.com:osmaclean/to-do-back-devchallenge.git
```

##### Acesse a pasta criada:
```
$ cd to-do-back-devchallenge
```

##### Instale as dependências:
```
$ npm install
```
---

### Criação do Banco de Dados
##### Crie o banco de dados MongoDB e configure a variável de ambiente:
```// .env
MONGO_URI="mongodb+srv://<user>:<password>@cluster.gvsbsvj.mongodb.net/<database>?retryWrites=true&w=majority"
```
---

### Testes
##### Inicie o projeto:
```
$ npm run test
```

---

### Estrutura do projeto
##### Tecnologias Utilizadas
<div style="display: inline_block"><br>
  
  [![My Skills](https://skillicons.dev/icons?i=nodejs,mongodb,vitest,prisma,typescript)](https://skillicons.dev) e Fastify
</div>

##### IDE Utilizada
<div> 
  
  [![My Skills](https://skillicons.dev/icons?i=vscode)](https://skillicons.dev)
</div>

---

## Documentação da API

#### Retorna todas as Tarefas

```http
  GET /tasks
```

#### Retorna uma Tarefa

```http
  GET /tasks/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Criação da Tarefa

```http
  POST /create
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. O título da tarefa desejada |
| `message`      | `string` | **Obrigatório**. A descrição da tarefa |
| `favorite`      | `boolean` | **Opcional**. O usuário determina se a tarefa é favorita ou não. |

#### Deletar Tarefa

```http
  DELETE /remove/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item que você quer |

#### Atualizar Tarefa

```http
  PUT /update/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. O título da tarefa desejada |
| `message`      | `string` | **Obrigatório**. A descrição da tarefa |
| `favorite`      | `boolean` | **Opcional**. O usuário determina se a tarefa é favorita ou não. |

#### Atualizar a propriedade 'favorite' da Tarefa

```http
  PATCH /tasks/favorite/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do item que você quer |


Link do respositório Back-end → [![portfolio](https://img.shields.io/badge/-CLIQUE%20AQUI-yellowgreen)](https://github.com/osmaclean/to-do-back-devchallenge)
Link do respositório Front-end → [![portfolio](https://img.shields.io/badge/-CLIQUE%20AQUI-yellowgreen)](https://github.com/osmaclean/to-do-front-devchallenge)
