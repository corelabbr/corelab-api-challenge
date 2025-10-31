# CoreNotes – Backend de Tarefas

Autor: Mauro Luiz dos Santos Junior

## Descrição Geral

Este pull request implementa o backend do CoreNotes, uma API RESTful em Node.js (AdonisJS + TypeScript) para gerenciamento de tarefas, com persistência em SQLite, validação robusta, tipagem forte e integração total com o frontend. O projeto segue os requisitos do desafio e está alinhado ao mockup e integrações descritas em [`Leiame.md`](../../Leiame.md).

## Como configurar e executar o backend localmente

1. **Ajuste a versão do Node.js:**  
   O backend requer Node.js na versão ^16.15.0, que foi mantido para preservar o formato original do desafio.
   Recomenda-se o uso de [nvm](https://github.com/nvm-sh/nvm) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para garantir compatibilidade.

   ```sh
   nvm install 16
   nvm use 16
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   node ace generate:key
   ```

4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

5. A API estará disponível em [http://localhost:3333](http://localhost:3333)

## Checklist de Funcionalidades

- [x] CRUD completo de tarefas (criar, listar, editar, deletar)
- [x] Marcar/desmarcar favorito
- [x] Definir cor para cada tarefa
- [x] Validação robusta dos dados
- [x] Testes automatizados cobrindo fluxos principais
- [x] Tipagem forte e interfaces explícitas
- [x] Padronização com Prettier e ESLint

## Detalhes Técnicos das Implementações

- **Tipo de Tarefa:**  
  [`app/Types/Task.ts`](backend/app/Types/Task.ts:1) define as interfaces `ITask`, `ICreateTaskDTO`, `IUpdateTaskDTO` e `IErrorResponse` para garantir clareza e segurança na manipulação dos dados.

- **Model de Tarefa:**  
  [`app/Models/Task.ts`](backend/app/Models/Task.ts:1) centraliza toda a lógica de acesso ao banco SQLite, desacoplando o controller e facilitando manutenção.

- **Controller:**  
  [`app/Controllers/TasksController.ts`](backend/app/Controllers/TasksController.ts:1) implementa os endpoints REST (`index`, `store`, `show`, `update`, `destroy`), utilizando o model e validadores.

- **Validação:**
[`app/Validators/TaskValidator.ts`](backend/app/Validators/TaskValidator.ts:1) define schemas para criação e atualização, exigindo título obrigatório e cor válida.
Agora, a cor aceita apenas nomes `color1` a `color12` ou `#FFF`, exatamente como no frontend.

- **Rotas:**  
  [`start/routes.ts`](backend/start/routes.ts:1) utiliza `Route.resource('/tasks', 'TasksController').apiOnly()` para expor as rotas RESTful.

- **Persistência:**  
  Utiliza SQLite via `sqlite3` e `sqlite`, garantindo persistência real dos dados em `database/database.sqlite`.
  A escolha vem do fato de não usarmos esse backend em produção, mas sim para fins de cumprir o desafio.

- **Padronização:**  
  Respostas da API seguem camelCase, alinhadas ao contrato do frontend.

## Funcionalidades Implementadas

- Criação, edição, exclusão e listagem de tarefas
- Marcação de tarefas como favoritas (favoritas no topo)
- Definição de cor para cada tarefa
- Validação de dados e tratamento de erros detalhado
- Tipagem forte em todas as operações
- Integração total com o frontend

## Testes Automatizados

- Testes funcionais em [`tests/functional/tasks-api.spec.ts`](backend/tests/functional/tasks-api.spec.ts:1) cobrem:
  - Criação, listagem, atualização e remoção de tarefas via API
  - Validação dos fluxos principais e respostas esperadas
  - Casos de erro: criação sem título, cor inválida, operações em tarefas inexistentes
- Utiliza `supertest` para simular requisições reais

## Observações

- O backend exige Node.js ^16.15.0 para funcionamento correto.
- É necessário configurar o `.env` e gerar uma `APP_KEY` antes de rodar.
- O código está limpo, modular, com separação clara entre model, controller, tipos e validação.
- A estrutura facilita manutenção, testes e futuras expansões.

## Scripts Utilitários

- [`scripts/reset-db.ts`](backend/scripts/reset-db.ts:1): Reseta o banco de dados (apaga e recria a tabela de tarefas).
- [`scripts/seed-db.ts`](backend/scripts/seed-db.ts:1): Popula o banco com tarefas de demonstração, usando apenas cores válidas (`color1` a `color12` ou `#FFF`), alinhadas ao frontend.

### Como usar:

```bash
npx ts-node scripts/reset-db.ts
npx ts-node scripts/seed-db.ts
```
