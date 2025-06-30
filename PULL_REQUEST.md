# 🚀 Pull Request: Criação de Tarefas com Autenticação + Testes Automatizados

## ✅ Descrição

Este PR implementa:

- A funcionalidade de **criação de tarefas (tasks)** autenticadas usando AdonisJS v6.
- A estrutura de **gestão de usuários (registro, autenticação, edição)**.
- Um ambiente de **testes automatizados** com banco de dados isolado (`corelabdb_test`).
- **Integração contínua (CI)** utilizando GitHub Actions com PostgreSQL.

---

## 🧱 Alterações principais

### 🔐 Autenticação

- Middleware `auth` aplicado aos grupos de rotas protegidas:
  - `/api/tasks`
  - `/api/users`
- Geração de token JWT via endpoint de login `/api/login`.
- Uso de prefixo `/api` (opcional).

---

### 👤 Funcionalidade de Usuários

- Registro de usuário via `POST /api/register`, com os campos:
  - `fullName` (nome completo obrigatório com validação regex forçando letra maiúscula no início de cada nome e pelo menos 2 nomes devem ser inseridos)
  - `email`  (sendo validado para verificar se o formato do e-mail é válido e obrigatório)
  - `password` (acima de 6 caracteres e com regex validando se possui 1 letra maiúscula e 1 número para criação de senhas fortes além de obrigatório)
- Edição de usuário (incluindo alteração de senha)
- Visualização do perfil (`/api/users/profile`), visualização de usuário por ID e listagem geral
- **Validações de dados aplicadas:**
  - Email obrigatório e válido.
  - Senha com regex exigindo **letra maiúscula e número**.
  - Tamanho máximo de acordo com o banco de dados.
- **Restrição de remoção:** um usuário não pode ser deletado se tiver tarefas vinculadas. Validação aplicada antes da exclusão usando um query builder do Lucid para definir um count (contador).

---

### 📝 Funcionalidade de Tarefas

- Controlador `TasksController` com método `store` para criar tarefas autenticadas.
- Validações incluídas:
  - `title`: obrigatório
  - `text`: obrigatório
  - `isFavorite`: obrigatório (booleano (não serão aceitos outros formatos pelo banco de dados, não passaria pela validação e nem pelo ORM Lucid))
  - `color`: hexadecimal opcional (`#RRGGBB`) (sendo acima de 4 caracteres e no máximo 7 conforme códigos hexadecimais usados para cores)  
NOTE: O front-end cadastra color como NULL (sendo o único campo nullable) no registro do front-end e o usuário pode definir uma cor usando o seletor de cor do front-end atribuindo um hexadecimal através de requisições do tipo `PATCH` para a API.
- Relacionamento: cada tarefa pertence a um usuário e no entanto faz uso de chave estrangeira (`user_id`).
- CRUD completo utilizando `route.resource` para o grupo de rotas de `tasks` que cria rotas para obtenção de lista (GET), para remoção (DELETE), para edição (PUT) e para registros (POST).
- Rotas `PATCH` (que permite realizar requisições para alterar um campo apenas) adicionais para edição pontual de:
  - `isFavorite`
  - `color` (na requisição `PATCH` foi usado uma validação com regex para validar se é um código hexadecimal válido conforme é enviado pelo front-end)
  - Foi realizado a configuração no CORS para aceitação de requisições `PATCH` (caso isso não seja feito a requisição é bloqueada com erro de Cross-Origin Resource Sharing).
- Validações adicionais:
  - Campos obrigatórios e opcionais.
  - Limites de caracteres (`minLength`, `maxLength`).
  - Tamanho máximo de acordo com o banco de dados.

---

### 🧪 Testes Automatizados (Japa)

- Criados os arquivos em `tests/functional/*` para testes de `users` e `tasks` totalizando 8 testes criados.
- Casos de teste cobrindo (test cases):
  - ✅ Criação de tarefa com autenticação.
  - ❌ Tentativa sem autenticação (401).
  - ❌ Campo `title` vazio (422).
  - ❌ Campo `color` inválido (422).
  - ✅ Criação de usuários e autenticação.
  - ❌ Tentativa de criar usuário e autenticar sem campos obrigatórios e válidos perante a validação.
- Banco de dados limpo entre os testes (`DELETE FROM tasks`, `DELETE FROM users`).

---

### ⚙️ Ambiente de Testes Isolado

- Adicionado `.env.test` com conexão dedicada ao banco `corelabdb_test`.
- Separação entre ambientes de `development` e `test`.
- Proteção contra execução de testes em banco de produção.
- Foram criados os testes funcionais para validar se as funcionalidades estão funcionando conforme o comportamento esperado e os requisitos definidos.

---

### 🤖 Integração Contínua (CI) com GitHub Actions

- Adicionado workflow `.github/workflows/adonis.yml`.
- PostgreSQL 17 configurado como serviço no pipeline.
- Banco `corelabdb_test` criado automaticamente via `psql`.
- Execução automática de:
  - Migrations: `node ace migration:run` para migrar para o banco de dados criado no serviço.
  - Testes: `npm run test` para executar os testes criados.

---

## 🧪 Instruções para execução local

### Ambiente de teste

### Rodar as migrations no ambiente de teste

#### Realizando a importação das migrations para o banco de dados de teste

```powershell
$env:NODE_ENV="test"; node ace migration:run
```

Execute os testes

```powershell
npm run test
```

⚠️ Importante: execute os testes apenas no ambiente de teste para evitar perda de dados em desenvolvimento.

### Execução da aplicação fora do ambiente de teste

#### Ambiente de desenvolvimento

Para Windows

```powershell
$env:NODE_ENV="development"
```

Realizando a importação das migrations para o banco de dados de desenvolvimento:

```powershell
$env:NODE_ENV="development"; node ace migration:run
```

Para execução de rotas use

```powershell
node ace list:routes
```

Execute os testes

```powershell
$env:NODE_ENV="development"; npm run dev
```

Para gerar APP_KEY:

```bash
node ace generate:key
```

Em ambientes que o SO usa o Kernel Linux:

```bash
NODE_ENV=development npm run dev
```

### Uso de Docker e Docker Compose

Eu criei os arquivos para Docker que foram testados e estão funcionando corretamente utilizando as variáveis de ambiente de `.env`. O uso é voltado para desenvolvimento da API.

Use o comando:

```bash
docker compose -f docker-compose.yml up
```

Ou

```bash
docker compose up --build
```

O docker-compose.yml foi criado e está configurado para uso do Docker Compose V2.

### Pronto para Produção

A aplicação está preparada para ser executada em ambientes de produção. Para deploy, recomenda-se:

- Configurar variáveis de ambiente (DB, APP_KEY, etc.).
- Utilizar uma plataforma como Heroku, Railway, Render ou VPS.
- O AdonisJS 6 é compatível com Node.js 20 e 22.

### Documentações de referência

[Documentação principal AdonisJS v6](https://docs.adonisjs.com/)

[Guia de início rápido (Getting Started)](https://docs.adonisjs.com/guides/start)

[Autenticação (Auth)](https://docs.adonisjs.com/guides/authentication)

[ORM Lucid (Modelos e Banco de Dados)](https://docs.adonisjs.com/guides/lucid)

[Validação de dados (Validator)](https://docs.adonisjs.com/guides/validator)

[Rotas e Controladores](https://docs.adonisjs.com/guides/routing)

[Testes (Japa)](https://docs.adonisjs.com/guides/testing)

[Middlewares](https://docs.adonisjs.com/guides/middleware)

[Migrations e Seeders](https://docs.adonisjs.com/guides/migrations)

[Configuração do ambiente (.env)](https://docs.adonisjs.com/guides/environment-variables)

[WebSockets](https://docs.adonisjs.com/guides/websocket)

[CLI do Adonis (Ace)](https://docs.adonisjs.com/guides/cli)

[Repositório GitHub AdonisJS v6](https://github.com/adonisjs/core)
