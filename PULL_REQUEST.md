<!-- markdownlint-disable MD033 -->

# CoreLab Node.js - Desafio `CRUD Tasks - API`

<div align="center">
   <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?" width="40%"/>
</div>
<br>

<div align="center">
   <a href="https://github.com/pablo-oliveiraDev">
      <img alt="Made by Pablo oliveira" src="https://img.shields.io/badge/made%20by-Pablo-yellow">
   </a>
   <img alt="GitHub Repo Size" src="https://img.shields.io/github/repo-size/pablo-oliveiraDev/backendcorelab">
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/pablo-oliveiraDev/backendcorelab">
</div>
<br>

<div align="center">

[**Desafio**](#desafio) &nbsp;&nbsp;**•**&nbsp;&nbsp;
[**Tecnologias**](#tecnologias) &nbsp;&nbsp;**•**&nbsp;&nbsp;
[**Backend-Api**](#) &nbsp;&nbsp;**•**&nbsp;&nbsp;

</div>

## Desafio

Nesse desafio você desenvolverá uma API para realizar o CRUD de suas _tasks_ (tarefas).

A API deve conter as seguintes funcionalidades:

-   Criação de uma _task_
-   Listagem de todas as _tasks_
-   Atualização de uma _task_ pelo `id`
-   Remover uma _task_ pelo `id`
-   Marcar pelo `id` uma _task_ como completa

### Tomada de decisões

Para a resolução do desafio, como solicitado usei o `Node.js` ,banco de dados `Mongodb` até pensei em usar ele em um container porém após analisar vi que seria desnecessário ja que ele tem plataforma em nuvem e ser utilizado em uma api , também pensei em usar o Postgres porém para tarefa seria "usar um canhão para matar uma mosca".
Utilizei tbm o orm prisma que se encaixa muito bem com os dois bancos de dados proposto para o desafio .
Quanto ao request.params usei os ids buscando direto no body na minha opinião esses dados visíveis no link deixa brechas para curiosos tentarem fazer algo no front tentarem algo...

### Instruções

-   Ao instalar o projeto/ iniciar do zero deve adicionar um novo .env e configurar a string de conexão do bd mongo `DATABASE_URL` e por fim executar o cmg `npx prisma generate` e irá subir o banco de dados .

### Rotas

#### `POST - /createTask`

-   Deve ser possível criar uma _task_ no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
-   Ao criar uma _task_, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

#### `GET - /findTaskByUser`

-   Deve ser possível listar todas as tasks salvas no banco de dados relacionadas ao user.
-   Também deve ser possível realizar uma busca, filtrando as tasks pelo `titulo` e `description`

#### `PUT - /updateTask`

-   Deve ser possível atualizar uma _task_ pelo `id`.
-   No `body` da requisição, deve receber somente o `titulo` e/ou `description` para serem atualizados.
-   Se for enviado somente o `titulo`, significa que o `description` não pode ser atualizado e vice-versa.

#### `DELETE - /deleteTask`

-   Deve ser possível remover uma _task_ pelo `id`.
-   Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma _task_ salva no banco de dados.

##### `PATCH - /updateCompleteTask`

-   Deve ser possível marcar a _task_ como completa ou não. Isso significa que se a _task_ estiver concluída, deve voltar ao seu estado “normal”.

## Deploy

O deploy feita na `render` e configurado para requisitos de verificação da mesma funcionando.
```
 Base url da rota 
 [`BaseUrl`](https://apicorelab-iqxx.onrender.com)
```
## Tecnologias

-   [`Node.js`](https://nodejs.org/n/)
-   [`Typescript`](https://www.typescriptlang.org/)
-   [`Prisma`](https://www.npmjs.com/package/prisma)
-   [`MongoDB`](https://www.npmjs.com/package/mongodb)

---

<h5 align="center">
 2024 - <a href="https://github.com/pablo-oliveiraDev">Pablo de Oliveira</a>
</h5>
