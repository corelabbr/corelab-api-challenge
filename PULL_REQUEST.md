## Tecnologias Utilizadas

- Express: O framework Express foi escolhido para facilitar a construção da API de forma rápida e eficiente.
- PostgreSQL: O banco de dados relacional PostgreSQL foi utilizado para armazenar os dados das tarefas.
- Prisma: Prisma foi escolhido como o ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL de maneira simples e segura.
- Zod: Para garantir a validação de entradas, o Zod foi utilizado para definir esquemas e validar os dados recebidos pela API.


## Endpoints da API
A API oferece os seguintes endpoints:

```
GET / Retorna todas as tarefas cadastradas.
POST / Cria uma nova tarefa.
PUT /task/:id Atualiza uma tarefa existente pelo ID.
DELETE /task/:id Exclui uma tarefa pelo ID.
PATCH /task/:id Marca ou desmarca uma tarefa como favorita.
PUT /task/:id/color: Atualiza a cor associada a uma nota de uma tarefa.
```

### Configurar Banco de Dados:

- Crie um banco de dados PostgreSQL.
- Configure as variáveis de ambiente no arquivo .env com as credenciais do banco de dados.

### Aplicar Migrações com o Prisma: 

- npx prisma migrate dev

### Rode a aplicação 

npm run dev


