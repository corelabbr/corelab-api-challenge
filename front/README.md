# NexoTask Frontend

Interface web para o sistema de gerenciamento de tarefas NexoTask. Este projeto consome a [API NexoTask](https://github.com/Ton-Chyod-s/nexo-task-api/tree/main/back) e foi desenvolvido com **React + TypeScript**, utilizando **Vite** e **Tailwind CSS** para uma UI leve, responsiva e moderna.

---

## Tecnologias Utilizadas

- **React + TypeScript** – para uma interface robusta e tipada.
- **Vite** – empacotador moderno com build rápido e ambiente de desenvolvimento otimizado.
- **Tailwind CSS** – estilização utilitária para uma UI limpa e responsiva.
- **React Router** – gerenciamento de rotas de forma simples e declarativa.
- **Lucide React** – ícones modernos e leves.
- **fetch** – para consumo da API backend.

---

## Funcionalidades

- Cadastro e login de usuários com integração à API.
- Recuperação e redefinição de senha via e-mail.
- Criação, edição, exclusão e visualização de tarefas.
- Marcação de tarefas favoritas.
- Interface responsiva com tema limpo e intuitivo.
- Integração com backend via requisições REST.

---

## Como rodar localmente

1. **Clone o projeto**

```bash
git clone https://github.com/Ton-Chyod-s/nexo-task-api/tree/dev/front.git
cd nexo-task-api
```

2. **Instale as dependência**
   
```bash
npm install
```

3. Configure as variáveis de ambiente
   
```bash
VITE_PORT=3001
```

4. Rode o projeto

```bash
npm run dev
```

5. Rode o tailwind para desenvolvimento

```bash
npm run dev:css
```

A aplicação estará disponível em http://localhost:3001

## Estrutura do Projeto

```text
front/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens e estilos
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── routes/          # Gerenciamento de rotas
│   └── main.tsx         # Ponto de entrada do app
├── index.html
├── vite.config.ts
└── tailwind.config.js
```

## Licença

Este projeto está licenciado sob a MIT license.
