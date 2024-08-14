# CoreNotes - teste para a empresa Corelab

Este repositório é referente ao back-end do projeto, e é necessário para que o front-end (cliente) funcione corretamente. Depois de instalar e iniciar o back-end, você pode baixar os arquivos de front-end **[neste repositório](https://github.com/fiorellilucas/corelab-challenge-frontend)** e lá seguir as instruções para configurar o cliente.

Para rodar o back-end, você vai precisar instalar o DBMS PostgreSQL E criar um banco de dados com o nome "corenotes", seguindo **[este tutorial](https://www.cherryservers.com/blog/postgres-create-database)**. 

Agora você pode clonar o repositório, instalar os packages com `npm install`.

Também vai precisar configurar um arquivo `.env` na raiz do repositório com uma linha para acessar o banco de dados, seguindo o seguinte exemplo:
```
DATABASE_URL=postgresql://[SEU_USUARIO]:[SUA SENHA]@localhost:5432/corenotes
```

Agora você pode rodar o servidor com `npx nodemon index.js`.

O front-end foi feito utilizando as seguintes tecnologias:
- Node.js
- Express
- Prisma ORM
- PostgreSQL

