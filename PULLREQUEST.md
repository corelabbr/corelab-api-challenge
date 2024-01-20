# Desenvolvimento

Primeiramente explicarei os motivos de ter escolhido as tecnologias utilizadas no projeto.
Utilizei o framework [Fastify](https://www.fastify.dev/) para desenvolver a API, pois acho que ele é um framework performático e simples de se utilizar.
Para o banco de dados, utilizei o [MongoDB](https://www.mongodb.com/), pois é um banco de dados não relacional e que possui uma boa performance.  Também relacionado a banco de dados, foi utilizado o ORM [Prisma](https://www.prisma.io/), para manter o código bem modularizado e facilitar a manutenção.

Decidi fazer pela metodologia de TDD (Test Driven Development), pois acredito que seja uma boa prática para desenvolver um código mais limpo com menos bugs e rápido. Assim apenas rodando `npm test` consigo ter certeza que esta funcionando a regra de negócio sem precisar fazer um request HTTP.

A estrutura de pastas do projeto foi feita da seguinte forma:

```sh
└───src
    ├───app
    │   ├───repositories
    │   └───usecases
    ├───controllers
    ├───database
    ├───models
    ├───routes
    └───tests
```

`app` contém os repositórios e os usecases, que são responsáveis por fazer a comunicação com o banco de dados e a regra de negócio, respectivamente.

`controllers` contém os controllers, que são responsáveis por fazer a comunicação com a camada de rede.

`database` contém os arquivos de configuração do banco de dados.

`models` contém a entidade como um objeto para ser usada nas regras de negócio.

`routes` contém os arquivos de configuração das rotas.

`tests` contém o repositório em memoria para ser usado nos testes simulando um banco de dados.

Tentei separar bem a regra de negócio do framework e da camada de rede, para que seja fácil de trocar o framework ou o banco de dados.
