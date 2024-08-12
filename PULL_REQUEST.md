# Teste da Corelab Backend
Aplicação que manipula post e seus dados

## Pré-requisitos
- [Node.js](https://nodejs.org/en) : ^16.15.0
- NPM: ^8,5,5
- IDE (Recomendamos [VsCode](https://code.visualstudio.com/))

## Instalação

Dentro da pasta do projeto, acesse a pasta API:
```
cd CORELAB-API-CHALLENGE
```
Criar um container no Docker
```
docker-compose up -d
```

Instalar as dependências:
```
npm install
```

Executar o projeto:
```
npm start
```

### Acesso:
Para acessar a API: 
<a>http://localhost:5000</a> 

## Tecnologias utilizadas
- [Node.js](https://nodejs.org/en) - Ambiente de execução de código Javascript do lado do servidor.
- [Express](https://expressjs.com/pt-br/) - Framework para aplicativos web Node.js.
- [Typescript](https://www.typescriptlang.org/) - Superset JavaScript.
- [Prisma](https://www.prisma.io/?via=start&gad_source=1) - ORM para banco de dados.
- [Postgresql](https://github.com/Ruan-Lauro/TesteFrontEnd) - Banco de dados.
- [Docker](https://www.docker.com/) - Gerencia o ambiente.

# Documentação da Estrutura da Aplicação Backend

Esta aplicação backend utiliza a arquitetura **Clean Architecture** ou **Layered Architecture**. A estrutura do projeto é organizada em pastas e arquivos específicos, cada um com suas responsabilidades bem definidas. A seguir, detalho a organização e o funcionamento de cada componente.

## Estrutura de Pastas

### **interfaces**

Esta pasta contém as definições das interfaces para as funções expostas pelas rotas da API. As interfaces especificam os parâmetros esperados e os tipos de retorno, facilitando a comunicação e integridade dos dados entre o frontend e o backend.

**Funções definidas:**
- **Adição de posts:** Define os parâmetros necessários para criar um novo post.
- **Busca de todos os posts:** Especifica o formato e os dados retornados ao solicitar todos os posts.
- **Deleção de posts:** Descreve o parâmetro (ID do post) e o tipo de retorno ao deletar um post.
- **Modificação de posts:** Define os parâmetros e o formato de retorno ao atualizar um post existente.

### **repositories**

Esta pasta contém as classes que gerenciam a interação com o banco de dados. Cada função no repositório lida com uma operação específica no banco de dados.

**Funções principais:**
- **`post`**: Cria um novo post com as propriedades `media` (URL da imagem ou PDF, nome do PDF, ID no Cloudinary), `text` (descrição do post), `title` (título do post), `color` (cor do post) e `favorite` (indicação se o post é favorito).
- **`delete`**: Deleta um post com base no ID fornecido.
- **`put`**: Atualiza um post existente usando o ID do post. Permite modificar propriedades específicas enquanto preserva as demais.
- **`get`**: Busca posts no banco de dados. Pode retornar todos os posts ou um post específico com base no ID.

### **services**

A camada de serviços é responsável por processar e validar os dados antes que sejam enviados ao banco de dados. Também realiza o tratamento e a transformação dos dados recebidos.

**Principais responsabilidades:**
- **Processamento de dados:** Valida e transforma os dados recebidos antes de encaminhá-los para o repositório.
- **Manutenção de integridade:** Ao modificar um post, o serviço verifica quais informações foram alteradas e mantém as informações restantes inalteradas.
- **Encaminhamento de dados:** Envia os dados processados para o repositório e retorna as respostas apropriadas ao frontend.

### **routes**

Esta pasta define as rotas da API e mapeia as funções apropriadas para cada endpoint (GET, POST, DELETE, PUT).

**Funções definidas:**
- **GET:** Rota para buscar posts, seja todos ou por ID.
- **POST:** Rota para criar novos posts.
- **DELETE:** Rota para deletar posts com base no ID.
- **PUT:** Rota para atualizar posts existentes.

# Rotas da API

## Obter Todos os Posts

- **Método**: `GET`
- **URL**: `http://localhost:5000/posts/`

## Criar um Novo Post

- **Método**: `POST`
- **URL**: `http://localhost:5000/posts`
- **Corpo da Requisição**:

  ```json
  {
    "title": "title",
    "text": "text",
    "media": [
      "link cloudinary",
      "idCloudinary"
    ],
    "color": "#ffffff",
    "favorite": true
  }

## Atualizar um Post
- **Método**: `PUT`
- **URL**: `http://localhost:5000/posts/{id}`

**Corpo da Requisição**:

```json
{
  "title": "title"
}
```

ou

```json
{
  "title": "title",
  "favorite": false
}
```
### Observação: Apenas os dados a serem modificados precisam ser passados.

## Excluir um Post
**Método**:` DELETE`
**URL**:` http://localhost:5000/posts/{id}`

## Estrutura de Arquivos

### **app.ts**

Configura a aplicação principal do backend. Importa e configura os principais componentes da aplicação:

- **CORS:** Configura o middleware para permitir a comunicação entre o frontend e o backend.
- **Configuração de ambiente:** Define as variáveis de ambiente necessárias para a aplicação.
- **Express:** Biblioteca Node.js para criar e gerenciar o servidor.
- **Roteamento:** Importa e utiliza o `Router` definido em `Router.ts` para definir as rotas da API.

### **Router.ts**

Configura as rotas da API e define como as requisições são encaminhadas para os manipuladores de rota apropriados.

- **Definição de rotas:** Integra as configurações de rotas (`postRoutes`) e define o prefixo da URL utilizado pelo frontend.

### **index.ts**

Configura a porta na qual o servidor será executado. Permite definir a porta dinamicamente para diferentes ambientes de execução.

### **Prisma**

- **Objetivo:** Facilita a manipulação e controle de dados no banco de dados **PostgreSQL**.
- **Funcionalidades:** Cria e gerencia o esquema do banco de dados, realiza consultas e manipula dados usando as classes definidas no repositório.

### **Docker**

- **Objetivo:** Gerencia o ambiente de banco de dados **PostgreSQL** em um container.
- **Funcionalidades:** Facilita a configuração e a manutenção do banco de dados, permitindo um ambiente de desenvolvimento consistente.




