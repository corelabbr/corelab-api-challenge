# Pull Request: ToDo Management Backend

## 🚀 Descrição do Backend

### Visão Geral
Implementação do backend do sistema de gerenciamento de tarefas utilizando Node.js + Adonis e MySQL.

## 🔧 Funcionalidades Implementadas

### Modelo ToDo
- Criação de modelo `ToDo` com atributos:
  - `title`
  - `description`
  - `is_favorite`
  - `color`

### Controllers
- `TodoController` com métodos CRUD:
  - `index()`: Listar tarefas
  - `store()`: Criar tarefa
  - `update()`: Atualizar tarefa
  - `delete()`: Deletar tarefa

### Migrations
- Criação de tabela `todos` com campos:
  - `id`
  - `title`
  - `description`
  - `is_favorite`
  - `color`
  - `created_at`
  - `updated_at`

  
### Rotas API
- Endpoints implementados:
  - `GET /api/v1/todos`
  - `POST /api/v1/todos`
  - `PUT /api/v1/todos/:id`
  - `DELETE /api/v1/todos/:id`

## 🔍 Melhorias Futuras
- Implementar autenticação
- Implementar cache


## 📦 Tecnologias
- Node.js 16.15
- Adonis 5.7.6 
- MySQL

## Como Configurar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/anthoniusdev/api-node.git
   cd api-node
   ```
  Você terá duas opções de instalação:
  - Usar Docker
  - Usar npm ou yarn
  
2. Usando Docker

   2.1 Copie o arquivo ```.env.example``` para ```.env```.
    ```bash
    cp .env.example .env
    ```
   2.2 Em seguida abra o arquivo `.env` em um editor de texto de sua preferência e preencha as variáveis existentes abaixo:
    ```env
    MYSQL_HOST=db
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=root
    MYSQL_DB_NAME=app
    ```
    - Certifique-se de substituir os valores corretamente.
      
   2.3 Subir containers:
    ```bash
    docker-compose up -d
    ```
    
    2.4 Com os containers docker em execução, digite o seguinte comando para acessar o cli do container da API:
    ```bash
    docker-compose exec api bash
    ```
    
    2.5 No cli do container, rode esse comando para executar as migrations:
    ```bash
    node ace migration:run
    ```
    A API estará rodando no container e pronta para receber requisições.
    
    2.6 Após isso, pode sair do cli container:
    ```bash
    exit
    ```
    
    - a API estará em execução.

3. Usando npm/yarn (sem Docker)
   
   3.1 Instale as dependências:
    ```bash
    npm install
    ```
    
   3.2 Configure o arquivo `.env` (Assim como no Docker, com a diferença de que você deve usar a url do mysql local e suas credenciais).
   
   3.3 Rode as migrations localmente:
    ```bash
    node ace migration:run
    ```
    
    3.4 Inicie a API:
    ```bash
    node ace serve
    ```

A API estará disponível em:
```
http://localhost:3333
```

Qualquer dúvida que tenha restado, estou a disposição para contato em:
WhatsApp
anthoniusmiguel@gmail.com

---
