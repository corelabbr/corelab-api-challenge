# NotesAPI

## 💻 Projeto
 Este aplicativo de notas autoadesivas foi desenvolvido para oferecer aos usuários uma experiência intuitiva e eficiente na gestão de suas anotações. O sistema permite que os usuários criem, editem, marquem como favoritas e excluam notas de forma simples e rápida, proporcionando uma solução prática para o gerenciamento de informações pessoais.

## 📝 Tecnologias e Implementação

O projeto é um aplicativo FullStack desenvolvido em **TypeScript** com **Express** no back-end. Utiliza **PostgreSQL** como banco de dados, gerenciado com o **ORM Prisma**. O banco de dados é facilmente configurável e executado em um container Docker, garantindo um ambiente de desenvolvimento consistente e eficiente.

### Funcionalidades

- **Criação de Notas**: Permite aos usuários criar novas notas com título e conteúdo.
- **Edição de Notas**: Usuários podem modificar o título e o conteúdo das notas existentes.
- **Marcar como Favorita**: Adiciona uma marcação especial para notas favoritas, facilitando o acesso rápido.
- **Exclusão de Notas**: Remove notas que não são mais necessárias.
- **Autenticação de Usuários**: Verifica se o usuário está logado, criando um usuário automaticamente se necessário.
- **Persistência de Dados**: As notas são armazenadas no banco de dados PostgreSQL, garantindo que os dados não sejam perdidos.

### Tecnologias e Ferramentas Utilizadas

- **TypeScript**: Para garantir a segurança e robustez do código.
- **Express**: Framework web para construção da API.
- **PostgreSQL**: Banco de dados relacional para armazenamento persistente.
- **Prisma**: ORM para interagir com o banco de dados de forma eficiente e segura.
- **Docker**: Containeriza o banco de dados para simplificar o desenvolvimento e a configuração.
- **JOI**: Utilizado para validação de dados de entrada, garantindo que as informações sejam corretas e seguras.
- **ESLint** e **Prettier**: Ferramentas de padronização de código para manter a qualidade e consistência do código fonte.
- **Swagger**: Implementado para gerar a documentação interativa da API. *Nota: A documentação do Swagger está disponível apenas em ambiente local.*

## Repositórios

- **Front-end**: [notes-app](https://github.com/vitorbelarmino/notes-app)
- **Back-end**: [notes-api](https://github.com/vitorbelarmino/notes-api)

</br>

## ⬇️ Como executar o projeto

```bash

# Clone este repositório
$ git clone git@github.com:vitorbelarmino/notes-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd notes-api

# Instale as dependências
$ npm install

# Eu deixei um arquivo .env.example configurado, basta renomea-lo para .env, ou configurar um proprio.

# Para o banco de dados, pode usar o docker-compose disponibilizado no projeto, usando o comando abaixo.
$ npm run db:up

# rode as migration
$ npx prisma migrate dev

# Execute a aplicação
$ npm run dev

# O App inciará na porta:3333 - acesse http://localhost:3333
```

> Github: https://github.com/vitorbelarmino

> Linkedin: https://www.linkedin.com/in/vitor-belarmino/

> Email: vitor.belarmino@hotmail.com
