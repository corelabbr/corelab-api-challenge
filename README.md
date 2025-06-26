# NexoTask – Sistema de Gerenciamento de Tarefas

O **NexoTask** é uma aplicação completa para gerenciamento de tarefas, composta por uma **API (Back-end)** e uma **interface web (Front-end)**. O objetivo é oferecer uma solução simples, funcional e bem estruturada para cadastro, edição e organização de tarefas, com autenticação, envio de e-mails e arquitetura limpa.

---

### Interface do sistema

[Veja as imagens do frontend aqui](https://github.com/Ton-Chyod-s/nexo-task-api/tree/dev/png)


## Tecnologias Utilizadas

###  Backend
- **Node.js + TypeScript** – ambiente robusto e escalável
- **Prisma ORM** – gerenciamento do banco de dados com migrations
- **JWT** – autenticação stateless
- **PostgreSQL** – banco de dados relacional
- **Vitest** – testes leves e rápidos
- **Docker** – ambiente padronizado
- **Nodemailer** – envio de e-mails

### Frontend
- **React + TypeScript** – SPA com tipagem forte
- **Vite** – build rápido e eficiente
- **Tailwind CSS** – estilização leve e responsiva
- **React Router** – controle de rotas
- **fetch** – integração com a API
- **Lucide React** – ícones modernos
- **Docker** – ambiente padronizado

---

## Estrutura do Projeto

```bash
nexo-task-api/
├── back/                 # Backend (Node.js, Clean Architecture)
├── front/                # Frontend (React + Vite)
├── docker-compose.yml    # Orquestra front, back e banco
├── LICENSE               # Licença MIT
├── .github/workflows/    # CI/CD (merge automatizado, PR template)
└── .vscode/              # Configurações de debug
```

## Instalação Local (Docker)

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado na máquina
- [Node.js](https://nodejs.org/) versão **22 ou superior**
- Terminal Bash, PowerShell ou o terminal do VS Code

---

### 1. Subir os containers com build

Execute o comando abaixo na raiz do projeto para construir as imagens e subir os containers:

```bash
docker-compose up -d --build
```
### 2. Verificar os containers e portas mapeadas
Use o comando:
```bash
docker ps
```

Você verá uma saída parecida com esta:
```bash
CONTAINER ID   NAME                  PORTS
abc123         nexo_back_container   0.0.0.0:3002->5050/tcp
def456         nexo_front_container  0.0.0.0:3001->5055/tcp
```
### Endpoints locais

- Front-end: http://localhost:3001

- Back-end (API): http://localhost:3002


## Instalação Local (sem Docker)

### 1. Clonar o repositório
```bash
git clone https://github.com/Ton-Chyod-s/nexo-task-api.git

cd nexo-task-api
```

### 2. Configurar o Backend

```bash
cd back

npm install

npx prisma generate --schema=./prisma/schema.prisma
```

Crie um arquivo .env com:

```env
JWT_SECRET=***
DATABASE_URL=postgresql://postgres:123@localhost:5433/nexoTaskApi
DATABASE_URL_PROD=postgresql://postgres:123@localhost:5433/nexoTaskApi

PORT=3002
PORT_FRONT=3001

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
PORT_SERVER=1000
SMTP_USER=exemplo@gmail.com
SMTP_PASSWORD=lolololol
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Rode o servidor:

```bash
npm run dev
```
Acesse o sistema em http://localhost:3002

### 3. Configurar o Frontend
   
```
cd ../front

npm install
```

Crie o .env:

```env
VITE_API_URL=http://localhost:3001
```

Inicie o front:

```bash
npm run dev
```

Acesse o sistema em http://localhost:3001

## Modo Debug com VS Code

Para executar o projeto em modo debug:

1. Rode o **frontend**:

```bash
cd front

npm run dev

npm run dev:css
```
2. configure o **Debug Full Stack**
   
   - abra executar e depurar (Ctrl + Shift + D)
  
   - na opção executar e depurar deixe marcado **Debug Full Stack**

3. No VS Code, com a pasta do projeto aberta, pressione F5 para iniciar o modo debug fullstack.
   
```text
O VS Code utilizará o arquivo .vscode/launch.json já configurado para subir o servidor automaticamente com breakpoints habilitados.
```

3. Aguarde até ver no terminal algo como:
   
```bash
Server running on http://localhost:3002

```