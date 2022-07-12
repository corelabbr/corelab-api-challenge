# Desafio Corelab Api

## Sobre o Projeto

Api desenvolvida para o desafio de código da [Corelab](https://www.corelab.com.br/).
Consiste em criar um CRUD onde é possivel criar Usuário e Veículos, favoritar, atualizar e deletar os veículos.

## Bibliotecas Usadas

- **NestJs** - Optei por utilizar o Nest por ser um framework que tenho familiaridade, ao contrário do AdonisJs. Usando o Nest eu pude agregar mais ao projeto por ele encapsular algumas parte como o módulo de autenticação que ele provê, tirando a responsabilidade de ter que criar um sistema de autenticação do zero. Outra grande vantagem do Nest são as diversas integrações que ele fornece nativamente.

- **Typeorm** - Orm utilizado para integrar o backend com o banco de dados. Foi escolhido pela facilidade de se usar e a integração com o NestJs de forma nativa, que facilita a criação da base de dados.

## Lógica do Código

O código foi feito baseado em Clean Code e Clean Arch. Ele foi separado em três partes: Domain, Application e Infra. Na **domain** fica as entidades e suas regras de negócio. A **application** fica responsável pelos casos de uso das entidades. e por fim a parte de **infra** é subdividida em **database** e **http**, onde **database** é responsável por interligar o banco de dados e o servidor http, a parte de **http** é onde fica o NestJs, que é o servidor, a partir dele que toda atividade do backend é desenvolvida, nele foi criado os módulos de usuários e veículos. Cada módulo fica responsável por gerir as requisições referentes a seu domínio.

O Código possui alguns testes de unidade nos níveis mais inferior, na parte de domain e application. Os testes estão am alguns casos faltantes, pois devido a pouco tempo que tive pra realizar o desafio por causa de fim de período na faculdade, ficou incompleto os testes.
