# Corelab API challenge

Este projeto é sobre um gerenciador de tarefas desenvolvido para auxilar quem usa em seus registros de tarefas.

### Repositórios dos projetos
- [Frontend](https://github.com/Nizoszz/corelab-web-challenge-impl)
- [Backend](https://github.com/Nizoszz/corelab-api-challenge-impl)

## Sumário

- [Visão Geral](#generalview)
- [Decisões de Arquitetura](#achitecturedecisions)
- [Tecnologias](#technologies)
- [Estrutura do Projeto](#projectstructure)
- [API Endpoints](#api-endpoints)
- [Instalação](#installation)
- [Como Usar](#howtouse)

## Visão Geral

Foi desenvolvido para fornecer um serviço back-end robusto e modular, utilizando tecnologias como Express, pg-promise e Docker. A arquitetura do projeto foi dividida em camadas para garantir a separação de responsabilidades, facilitando a manutenção e evolução da aplicação.

## Decisões de Arquitetura

- Express: Escolhido pela sua simplicidade e flexibilidade, permitindo uma fácil integração com outras tecnologias e uma estrutura de roteamento clara.
- pg-promise: Utilizado para comunicação de baixo nível com o container Docker que hospeda o banco de dados PostgreSQL. Este módulo fornece uma interface poderosa para manipulação de dados diretamente no banco.
- Axios: Empregado para a implementação de testes de integração com a API, permitindo chamadas HTTP de maneira fácil e eficiente.
- Docker: Utilizado para containerizar tanto o banco de dados PostgreSQL quanto a aplicação Node.js. O Dockerfile é configurado para buildar a imagem da aplicação Node.js, permitindo que a aplicação seja executada dentro de um container, garantindo um ambiente de desenvolvimento e produção consistente.

## Desenvolvimento com TDD

O projeto foi desenvolvido utilizando Test-Driven Development (TDD), o que assegurou a criação de uma base de código robusta e confiável. Foram implementados testes de integração cobrindo os casos de uso, a API e a conexão com o banco de dados, garantindo que todas as funcionalidades estejam corretamente implementadas e funcionem como esperado.

## Padrões de Projeto

Foram aplicados vários padrões de projeto, como Singleton, Factory e Adapter, além de princípios SOLID para assegurar reutilização e fácil manutenção do código.

## Tecnologias

- [Express](https://expressjs.com/) - Framework de aplicação web Node.js.
- [pg-promise](https://vitaly-t.github.io/pg-promise/) - Biblioteca para comunicação com o PostgreSQL.
- [Axios](https://axios-http.com/) - Cliente HTTP para fazer requisições a APIs.
- [Docker](https://www.docker.com/) - Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gerenciamento de banco de dados relacional.

## Estrutura do Projeto

A estrutura do projeto é organizada em camadas para garantir a separação de responsabilidades:

- **Domain:**  
  Contém a entidade agregadora e suas validações de regras de negócio através de Value Objects e exceções.

- **Usecases:**  
  Compreende os comandos de interação responsáveis pelas operações de criação, recuperação, deleção e atualização que o usuário pode realizar.

- **HTTP:**  
  Inclui a configuração do framework Express, criando uma independência do framework para as outras camadas da aplicação. Além disso, contém os controllers onde as rotas da aplicação são registradas, a partir de uma abstração do Express.

- **Database:**  
  Responsável por instanciar uma conexão com o banco de dados PostgreSQL utilizando pg-promise. A conexão é gerida através do padrão Singleton, garantindo que apenas uma instância da conexão seja utilizada ao longo da aplicação, promovendo eficiência e evitando problemas de concorrência.

- **Repository:**  
  Esta camada cuida da persistência dos objetos de domínio. Utilizando o padrão de repositório, é feita a abstração das operações de armazenamento e recuperação de dados, permitindo que as regras de negócio na camada de domínio permaneçam isoladas dos detalhes de implementação do banco de dados.

## API Endpoints

### GET /tasks

Recupera uma lista com todas as tasks.

**Response:**

```json
[
  {
    "task_id": "uuid",
    "title": "string",
    "content": "string",
    "color": "string",
    "is_favorite": boolean,
    "created_at": "date"
  }
]
```

### POST /tasks - Registra uma nova task.

**Request:**

```json
{
  "title": "string",
  "content": "string"
}
```

**Response:**

```json
{
  "task_id": "uuid"
}
```

### PATCH /tasks/:id - Atualiza o dado de uma task específica com dados opcionais.

**Request:**

```json
{
  "title": "string",
  "content": "string",
  "color": "string",
  "is_favorite": boolean
}
```

**Response:**

```json
{
  "task_id": "uuid"
}
```

### DELETE /tasks/:id - Deleta uma task especifica específica.

**Response**

```
No content
```

## Instalação

### Pré-requisitos

- Node.js (versão 16.X.X)
- Docker (versão 4.33.X)
- PostgreSQL (versão 16.4.X)
- NPM (versão 8.X.X)

### Passos para Instalar

1. Clone este repositório:
   ```bash
   git clone git@github.com:Nizoszz/corelab-api-challenge-impl.git
   ```
2. Entre na pasta do projeto:

   ```bash
   cd nome-do-projeto
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

5. Inicie os containers do Docker:

   ```bash
   docker-compose up -d
   ```

## Como Usar

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).
