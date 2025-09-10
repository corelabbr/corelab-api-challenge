# Corelab Todo List - Solução Completa

## 👨‍💻 Desenvolvedor: Arthur Aguiar

## 📋 Visão Geral

Implementei uma aplicação completa de gerenciamento de tarefas atendendo todos os requisitos do desafio Corelab. Desenvolvi um backend em Node.js + Express + MongoDB e frontend em React + TypeScript com interface moderna e totalmente responsiva.

## 🏗️ Arquitetura da Solução

### Backend (API)

- **Framework**: Node.js com Express.js
- **Banco de Dados**: MongoDB com Mongoose ODM
- **Linguagem**: JavaScript
- **API**: RESTful completa com CRUD
- **Validação**: Dados e error handling
- **CORS**: Configurado para frontend

### Frontend (Web)

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilização**: CSS Modules + abordagem mobile-first
- **HTTP Client**: Axios
- **Componentização**: Arquitetura modular

## ✅ Funcionalidades Implementadas

### Requisitos Obrigatórios

- [x] **CRUD Completo**: Create, Read, Update, Delete de tarefas
- [x] **Sistema de Favoritos**: Marcar/desmarcar como favorito
- [x] **Sistema de Cores**: Prioridades com cores (0-5)
- [x] **Filtros**: Por favoritos e por prioridade
- [x] **Ordenação**: Favoritos sempre no topo
- [x] **Design Responsivo**: Mobile-first

### Funcionalidades Extras

- [x] **Modal de Edição Completo**
- [x] **Sistema de Prioridades Visual**
- [x] **Componentes Reutilizáveis**
- [x] **Validação Frontend/Backend**
- [x] **Type Safety com TypeScript**

## 🎨 Sistema de Prioridades

| Nível | Cor      | Significado        |
| ----- | -------- | ------------------ |
| 0     | Cinza    | Nenhuma prioridade |
| 1     | Azul     | Baixa (Estudo)     |
| 2     | Verde    | Média (Trabalho)   |
| 3     | Laranja  | Alta (Pessoal)     |
| 4     | Vermelho | Urgente (Saúde)    |
| 5     | Rosa     | Crítica (Reunião)  |

## 📱 Responsividade Mobile-First

- 📱 **Mobile**: 320px+ (1 coluna)
- 📋 **Tablet**: 768px+ (2 colunas)
- 🖥️ **Desktop**: 1024px+ (3 colunas)

## 🛠️ Tecnologias Utilizadas

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- CORS middleware
- Dotenv

### Frontend

- React 18 + TypeScript
- Vite
- Axios

## 📁 Estrutura Real do Projeto

### Backend (`TodoListBackend/`)

TodoListBackend/
├── 📁 assets/
│ └── background.png
├── 📁 types/
│ └── Task.ts
├── 📁 utils/
│ └── dateFormatter.ts
├── 📁 models/
│ └── Task.js
├── server.js
├── package.json
└── .env

text

### Frontend (`TodoListFrontEnd/`)

TodoListFrontEnd/
├── 📁 src/
│ ├── 📁 components/
│ │ ├── TaskList.tsx
│ │ ├── TaskModal.tsx
│ │ ├── TaskForm.stx
│ │ ├── TaskFilter.tsx
│ │ ├── FavoriteButton.tsx
│ │ └── PriorityDropdown.tsx
│ ├── 📁 services/
│ │ └── api.ts
│ ├── 📁 types/
│ │ └── Task.ts
│ ├── 📁 utils/
│ │ └── dateFormatter.ts
│ ├── App.tsx
│ └── main.tsx
├── public/
└── package.json

text

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 16+
- MongoDB (local ou Atlas)
- Git

### 1. Backend

```bash

npm install

# Configure as variáveis de ambiente
echo "MONGO_URI=mongodb://localhost:27017/todoapp" > .env
echo "PORT=3000" >> .env

# Execute o servidor
node server.js
2. Frontend
bash

npm install
npm run dev
3. MongoDB
bash
# Opção Local (Recomendada)
sudo systemctl start mongod

# Opção Cloud (MongoDB Atlas)
# Use a connection string no .env:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/todoapp

📊 API Endpoints
Método	Endpoint	Descrição
GET	/tasks	Lista todas as tarefas
POST	/tasks	Cria nova tarefa
GET	/tasks/:id	Busca tarefa por ID
PUT	/tasks/:id	Atualiza tarefa
DELETE	/tasks/:id	Remove tarefa

Filtros Disponíveis
?favorite=true - Filtra por favoritos
?priority=2 - Filtra por prioridade

🎯 Componentes Implementados
Frontend

TaskForm: Formulario para criação de tarefa

TaskList: Exibe todas a tarefas

TaskModal: Modal completo de exclusão/edição

TaskFilters: Filtros por favorito e prioridade

FavoriteButton: Toggle de favoritos com UI

PriorityDropdown: Seleção de prioridades com cores

dateFormatter: Utilitário para formatação de datas

Backend
Task: Modelo MongoDB com schema completo

Task Type: Definições TypeScript para type safety

🏆 Destaques Técnicos
Decisões de Arquitetura
Separação Clara: Frontend/backend completamente independentes

Type Safety: TypeScript em ambos os lados

Componentização: Componentes reutilizáveis e especializados

Utils Organizados: Funções utilitárias separadas por responsabilidade

Desafios Superados
CSS Complexo: Optei por CSS puro para demonstrar domínio, reconhecendo que frameworks acelerariam o desenvolvimento

Responsividade: Implementei breakpoints progressivos com mobile-first

Comunicação API: Configurei CORS e error handling robusto

Estado UI: Gerenciamento eficiente de estados de loading e erro

🧪 Testes e Validações
CRUD Completo: Create, Read, Update, Delete

Sistema de Favoritos: Toggle e filtro

Sistema de Prioridades: 6 níveis com cores

Filtros Combinados: Favoritos + prioridade

Responsividade: Mobile, tablet, desktop

Validação: Dados frontend e backend

Error Handling: Tratamento de erros de rede

Acessibilidade: HTML semântico e ARIA labels

🚀 Melhorias Futuras
Testes Automatizados:

Autenticação: Sistema de usuários

Drag-and-Drop: Reordenar tarefas

Modo Escuro: Tema dark/light

PWA: Funcionamento offline

Deploy: CI/CD com Vercel + Railway

💡 Lições Aprendidas
Trade-offs CSS: Controle total vs velocidade de desenvolvimento

MongoDB Flexibilidade: Vantagens do NoSQL para prototipagem

Optimistic Updates: Melhora significativa na UX

Mobile-First: Planejamento antecipado resulta em melhor experiência mobile
```
