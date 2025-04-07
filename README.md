![Interface do Sistema](./Screen.png)

# 📌 Lista de tarefas

Gerencie suas tarefas de forma simples e eficiente com este sistema. Este projeto é composto por um frontend desenvolvido em React (NextJS) e um backend baseado em Node.js (AdonisJS).

---

## 🚀 **Funcionalidades**

### **Backend**

- API RESTful para gerenciamento das Tarefas.
- Suporte a operações de CRUD.

---

## 🛠️ **Tecnologias Utilizadas**

### **Backend**

- **Node.js** com **AdonisJs**.
- **MYSQL** para banco de dados.

## ⚙️ **Pré-requisitos**

Certifique-se de ter instalado:

- **Node.js** >=22.x
- **PNPM** ou **NPM**.

## 🛠️ **Como Configurar o Projeto**


1. Clone o repositório:

```bash
   git clone https://github.com/EvandroEusebio/corelab-api-challenge.git
```

2. Acesse a pasta do projecto backEnd:

```bash
   cd corelab-api-challenge
```

3. Instale as dependencias

```bash
   npm install 
   ou 
   pnpm install
```

4. crie o arquivo .env e adicione o seguinte script:

```bash
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=QtAoffIUzMn2iQTAWo7p19R5AZTSPGOq
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306 // Adicione a porta do seu Banco de Dados
DB_USER=root // Adicione o usuário do seu banco
DB_PASSWORD=SUA_SENHA // Adicione a senha do seu banco de dados
DB_DATABASE=NOME_DO_BANCO // Adicione o nome do seu Banco de dados
```

5. Execute as migrações do banco

```bash
node ace migration:run
```

6. Inicie o servidor

```bash
npm run dev 
ou 
pnpm run dev
```

🧪 Como Usar

- **Acesse a URL: Ex. http://localhost:5173.**
- **Gerencie suas Tarefas no painel.**

📖 Rotas da API

- **GET /api/todo/** Obter as Tarefas.
- **POST /api/todo/create** Criar um Tarefa.
- **PUT /api/todo/edit/{id}** Editar uma tarefa.
- **DELETE /api/todo/delete/{id}** Deletar uma tarefa.

📧 Contato

- **Email: ** eusebioevandro01@gmail.com
- **GitHub: ** https://github.com/EvandroEusebio
- **Linkedin: ** https://www.linkedin.com/in/evandro-eus%C3%A9bio-121a5a26a/
