# API de Gerenciamento de Tarefas

Uma API RESTful para gerenciamento de tarefas construída com Node.js, TypeScript, Express e MySQL, seguindo os princípios da Clean Architecture.

## Arquitetura

Este projeto implementa a Clean Architecture (também conhecida como Arquitetura Hexagonal ou Ports and Adapters), que oferece:

- **Separação de Responsabilidades**: Lógica de negócio isolada de dependências externas
- **Testabilidade**: Fácil de testar devido às fronteiras claras entre camadas
- **Manutenibilidade**: Mudanças em uma camada não afetam outras
- **Independência de Framework**: A lógica de negócio central não depende de frameworks

### Estrutura do Projeto

```
src/
├── usecases/         # Regras de negócio da aplicação
├── Infrastructures/  # Frameworks e ferramentas externas
│   ├── express/     # Configuração do Express.js
│   ├── package/     # Pacotes externos
│   └── repositories/# Implementações de acesso a dados
└── db/              # Configuração do banco de dados
```

## Tecnologias Utilizadas

- **TypeScript**: Para segurança de tipos e melhor experiência de desenvolvimento
- **Express.js**: Framework web
- **MySQL**: Banco de dados
- **Jest**: Framework de testes
- **Docker**: Containerização

## Como Começar

### Pré-requisitos

- Docker
- Docker Compose

### Configuração do Ambiente

1. Copie o arquivo de ambiente de exemplo:
```bash
cp .env.example .env
```

2. Configure seu arquivo `.env` com os valores apropriados:
```
PORT=8080
DB_HOST=mysql
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306
DB_ROOT_PASSWORD=senha_root
```

### Executando a Aplicação

Inicie a aplicação usando Docker Compose:

```bash
docker-compose up --build
```

Este comando irá:
1. Construir o container da aplicação
2. Iniciar o banco de dados MySQL
3. Criar as tabelas necessárias
4. Iniciar o servidor da API

A API estará disponível em: `http://localhost:8080`

## Testes

O projeto inclui testes de integração cobrindo o ciclo de vida completo das tarefas. Os testes são escritos usando Jest e Supertest.

Para executar os testes:

```bash
npm run test
```

A cobertura de testes inclui:
- Criação de tarefas
- Listagem de todas as tarefas
- Busca de tarefa por ID
- Atualização de tarefas
- Gerenciamento de tarefas favoritas
- Exclusão de tarefas

## Endpoints da API

- `POST /task` - Criar uma nova tarefa
- `GET /task` - Listar todas as tarefas
- `GET /task/:id` - Buscar tarefa por ID
- `PUT /task` - Atualizar uma tarefa
- `DELETE /task/:id` - Excluir uma tarefa
- `GET /task/star/favorite` - Listar tarefas favoritas

## Estrutura das Tarefas

Cada tarefa possui os seguintes campos:
- `id`: Identificador único
- `title`: Título da tarefa
- `is_favorite`: Indica se a tarefa é favorita
- `color`: Cor associada à tarefa