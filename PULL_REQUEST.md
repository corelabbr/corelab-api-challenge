## Solução do Desafio Corelab: Aplicação de Notas (CoreNotes)

Olá, equipe Corelab!

Este Pull Request contém a minha solução completa para o Desafio de Lista de Tarefas. Foi um projeto extremamente divertido e desafiador de construir, no qual busquei não apenas cumprir os requisitos, mas também aplicar boas práticas de arquitetura e desenvolvimento.

---

### Funcionalidades Implementadas

Todas as funcionalidades solicitadas no desafio foram implementadas:

- [x] **CRUD Completo:** As notas podem ser criadas, lidas, atualizadas e deletadas, com todas as ações persistidas no banco de dados através da API.
- [x] **Sistema de Favoritos:** É possível marcar notas como favoritas, e elas são automaticamente exibidas no topo da lista para fácil acesso.
- [x] **Cores para Notas:** O usuário pode atribuir uma cor específica para cada nota através de uma paleta interativa.
- [x] **Busca em Tempo Real:** A lista de notas é filtrada instantaneamente conforme o usuário digita no campo de busca.
- [x] **Filtro por Cor:** O usuário pode filtrar as notas para exibir apenas aquelas de uma cor específica.
- [x] **Responsividade:** O layout foi construído seguindo a abordagem "Mobile First" e se adapta de forma fluida a telas de desktop.

---

### 🛠️ Tecnologias e Arquitetura

Para a construção do projeto, fiz as seguintes escolhas tecnológicas:

- **Back-end (AdonisJS + Prisma):** Escolhi o AdonisJS pela sua estrutura organizada e o Prisma pela sua excelente integração com o TypeScript, garantindo segurança de tipos na comunicação com o banco de dados (SQLite).

- **Front-end (React + TypeScript + Sass):** Utilizei React para uma UI reativa e componentizada, TypeScript para qualidade e manutenibilidade, e Sass (SCSS) para uma estilização mais organizada.

- **Padrão de Projeto (Adapter):** Para as notificações, implementei o padrão Adapter, desacoplando a aplicação da biblioteca `react-toastify` e criando um `NotificationService` reutilizável.

- **Otimização de Performance:** A lógica de filtragem no front-end foi otimizada com o hook `useMemo` para evitar cálculos desnecessários.

---

### ✨ Destaques e Itens "Para Impressionar"

- **Dockerização Completa:** A aplicação inteira (front-end e back-end) foi containerizada com Docker e orquestrada com `docker-compose`. Isso permite que qualquer pessoa execute o projeto completo com um único comando.

- **Qualidade de Código:** Foco em um código limpo, componentizado e na aplicação de padrões de projeto para garantir a manutenibilidade e escalabilidade.

---

### 🚀 Como Executar

Existem duas maneiras de rodar esta aplicação: com Docker (método recomendado) ou localmente.

#### Rodando com Docker (Recomendado)

**Pré-requisitos:**

- Docker Desktop instalado e rodando.

**Passos:**

1.  Clone os dois repositórios (`corelab-web-challenge` e `corelab-api-challenge`) para dentro da mesma pasta pai.

    ```
    your-main-folder/
    ├── corelab-api-challenge/
    └── corelab-web-challenge/
    ```

2.  Na raiz desta pasta principal, crie um arquivo chamado `docker-compose.yml` com o seguinte conteúdo:

    ```yaml
    version: '3.8'
    services:
      backend:
        build: ./corelab-api-challenge
        container_name: corelab-api
        ports:
          - '3333:3333'
        volumes:
          - ./corelab-api-challenge:/app
          - /app/node_modules
        environment:
          - DATABASE_URL=file:./dev.db
      frontend:
        build: ./corelab-web-challenge
        container_name: corelab-web
        ports:
          - '3000:3000'
        volumes:
          - ./corelab-web-challenge:/app
          - /app/node_modules
        depends_on:
          - backend
    ```

3.  No terminal, a partir da pasta raiz, execute:
    ```bash
    docker compose up --build
    ```
4.  Acesse a aplicação em `http://localhost:3000`.

#### Rodando Localmente (Sem Docker)

**Pré-requisitos:**

- Node.js `v16.15.0`
- NPM `v8.5.5`

**Backend:**

1.  Navegue até a pasta `corelab-api-challenge`.
2.  Rode os comandos: `npm install`, `cp .env.example .env`, `node ace generate:key`, `npx prisma migrate dev`, e finalmente `npm run dev`.

**Frontend:**

1.  Em um novo terminal, navegue até a pasta `corelab-web-challenge`.
2.  Rode os comandos: `npm install` e `npm start`.

---

### 🎬 Demonstração

## https://drive.google.com/file/d/1ds5InIWwT7Omxl1yimCLB4tGqypnmNIa/view?usp=sharing

Agradeço a oportunidade de participar do desafio. Estou à disposição para qualquer dúvida.
