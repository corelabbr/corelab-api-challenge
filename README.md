# Corelab Backend API

API RESTful para gerenciamento de tarefas (to-do list) desenvolvida em Node.js com Express e TypeScript.

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **TypeScript**: Superset tipado do JavaScript
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **CORS**: Middleware para Cross-Origin Resource Sharing

## Funcionalidades

- CRUD completo de tarefas
- Sistema de favoritos
- Sistema de cores personalizadas
- Filtros por favoritos e cores
- Validação de dados
- Tratamento de erros

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/corelab-todos
```

4. Inicie o MongoDB:
```bash
sudo systemctl start mongod
```

5. Execute a aplicação:
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## API Endpoints

### GET /api/todos
Lista todas as tarefas com filtros opcionais.

**Query Parameters:**
- `favorite=true`: Filtra apenas tarefas favoritas
- `color=#hexcode`: Filtra por cor específica

**Resposta:**
```json
[
  {
    "_id": "...",
    "title": "Minha tarefa",
    "description": "Descrição da tarefa",
    "isFavorite": false,
    "color": "#ffffff",
    "createdAt": "2025-09-07T03:00:00.000Z",
    "updatedAt": "2025-09-07T03:00:00.000Z"
  }
]
```

### GET /api/todos/:id
Busca uma tarefa específica pelo ID.

### POST /api/todos
Cria uma nova tarefa.

**Body:**
```json
{
  "title": "Título da tarefa",
  "description": "Descrição opcional",
  "isFavorite": false,
  "color": "#ffffff"
}
```

### PUT /api/todos/:id
Atualiza uma tarefa existente.

### DELETE /api/todos/:id
Remove uma tarefa.

## Estrutura do Projeto

```
src/
├── models/
│   └── Todo.ts              # Modelo de dados do MongoDB
├── controllers/
│   └── todoController.ts    # Lógica de negócio da API
├── routes/
│   └── todoRoutes.ts        # Definição das rotas RESTful
├── config/
│   └── database.ts          # Configuração do MongoDB
├── app.ts                   # Configuração principal do Express
└── server.ts                # Inicialização do servidor
```

## Modelo de Dados

```typescript
interface ITodo {
  title: string;           // Obrigatório
  description?: string;    // Opcional
  isFavorite: boolean;     // Padrão: false
  color: string;           // Padrão: "#ffffff"
  createdAt: Date;         // Automático
  updatedAt: Date;         // Automático
}
```

## Scripts Disponíveis

- `npm run dev`: Executa em modo de desenvolvimento
- `npm run build`: Compila o TypeScript
- `npm start`: Executa a versão compilada
- `npm test`: Executa os testes (a implementar)

## Configuração CORS

A API está configurada para aceitar requisições de qualquer origem durante o desenvolvimento. Para produção, recomenda-se configurar origens específicas.

## Tratamento de Erros

A API retorna erros padronizados com códigos HTTP apropriados:

- `400`: Bad Request (dados inválidos)
- `404`: Not Found (recurso não encontrado)
- `500`: Internal Server Error (erro interno)

## Validações

- **title**: Campo obrigatório, string não vazia
- **description**: Campo opcional, string
- **isFavorite**: Boolean, padrão false
- **color**: String, padrão "#ffffff"

