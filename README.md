# Corelab API Challenge — Tasks API

API REST construída com **AdonisJS v5 + Lucid** para gerenciar tarefas (“notes”) conforme o desafio. Implementa **CRUD completo**, **filtros de busca** e **PostgreSQL** como banco de dados.

---

## ✅ O que foi feito

### Stack
- **AdonisJS v5** (Node 16.x requerido)
- **Lucid ORM 18.x**
- **PostgreSQL** (config via `.env`)
- **Luxon** (`DateTime`) para timestamps

### Domínio `Task`
**Campos:**
- `id` (PK, auto-increment)
- `title` (string, obrigatório)
- `description` (text, opcional)
- `color` (enum: `yellow` | `blue` | `green` | `peach`, padrão `yellow`)
- `is_favorite` (boolean, padrão `false`)
- `created_at` / `updated_at` (timestamps)

### Migration
- Cria **tipo enum nativo** no Postgres (`task_color`)
- Cria tabela `tasks` com as colunas acima

### API REST
- `GET /` — healthcheck simples  
- `POST /tasks` — cria tarefa  
- `GET /tasks` — lista tarefas (com filtros)  
- `PATCH /tasks/:id` — atualização parcial  
- `DELETE /tasks/:id` — exclusão

### Ajustes do projeto
- `.adonisrc.json` atualizado (providers/commands do Lucid)
- `config/database.ts` preparado para PostgreSQL
- `.env` de exemplo com `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_DB_NAME`, `DB_CONNECTION=pg`
- Corrigido erro de datas do Lucid: uso de `@column.dateTime()` (substitui o legado `DateTimeColumn`)
- Corrigido erro de env: inclusão de `DRIVE_DISK=local` quando o validador exige

---

## 📁 Estrutura relevante

```
app/
  Controllers/
    Http/
      TasksController.ts
  Models/
    Task.ts

config/
  database.ts

database/
  migrations/
    0000000000000_create_tasks_table.ts

start/
  routes.ts

.env (exemplo)
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- **Node 16.x** (use `nvm` se necessário)
- **PostgreSQL** rodando e com um database criado

**Selecionar Node 16:**
```bash
nvm install 16
nvm use 16
```

**Instalar dependências:**
```bash
npm ci
```

**Configurar `.env`:**
```dotenv
# App
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=alguma-chave-secreta

# Banco
DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=corelab
PG_PASSWORD=corelab
PG_DB_NAME=corelab

# Necessário para o validador de env do Adonis
DRIVE_DISK=local
```

**Gerar/atualizar manifest do Ace (se precisar):**
```bash
node ace generate:manifest
```

**Rodar migrações:**
```bash
node ace migration:run
```

**Subir o servidor:**
```bash
npm run dev
# http://127.0.0.1:3333
```

---

## 🔀 Rotas & exemplos

### Healthcheck
**GET /**  
**Resposta:**
```json
{ Rota_Está_Funcionando: true }
```

---

### Criar tarefa
**POST /tasks**  
**Body:**
```json
{
  "title": "Projeto Corelab",
  "description": "Modelo + Controller",
  "color": "yellow",
  "isFavorite": false
}
```

**cURL:**
```bash
curl -s -X POST http://127.0.0.1:3333/tasks   -H "Content-Type: application/json"   -d '{"title":"Projeto Corelab","description":"Modelo + Controller","color":"yellow","isFavorite":false}'
```

---

### Listar tarefas (com filtros)
**GET /tasks**  

**Query params:**
- `q` — busca parcial em `title` e `description`
- `favorite` — `true` | `false`

**Exemplos:**
```bash
curl -s http://127.0.0.1:3333/tasks | jq .
curl -s "http://127.0.0.1:3333/tasks?q=Adonis&favorite=true" | jq .
```

---

### Atualizar tarefa (parcial)
**PATCH /tasks/:id**  

**Body (exemplos):**
```json
{ "title": "Projeto Corelab V5", "color": "blue" }
```
```json
{ "isFavorite": true }
```

**cURL:**
```bash
curl -s -X PATCH http://127.0.0.1:3333/tasks/1   -H "Content-Type: application/json"   -d '{"title":"Projeto Corelab V5","color":"blue"}' | jq .
```

---

### Excluir tarefa
**DELETE /tasks/:id**
```bash
curl -i -X DELETE http://127.0.0.1:3333/tasks/1
```

---

## 🧠 Decisões de implementação
- **Enum nativo Postgres (`task_color`)** para integridade e validação mais segura de `color`.
- **Busca simples via `q`** em `title`/`description` e **filtro booleano `favorite`**.
- **Compatibilidade**: projeto requer **Node ^16.15.0** — recomenda-se `nvm` para alternar versões.
- **Correções conhecidas**:
  - `DRIVE_DISK` ausente → definir `DRIVE_DISK=local` no `.env`.
  - Decorators de data → usar `@column.dateTime()` (Lucid 18) no lugar do legado `DateTimeColumn`.

---

## 🚀 Próximos passos sugeridos
- Validações com `@adonisjs/validator`.
- Paginação no `GET /tasks`.
- Testes automatizados (**Japa**) para fluxos e erros.
- **CORS** / **rate-limit** caso seja exposto publicamente.
