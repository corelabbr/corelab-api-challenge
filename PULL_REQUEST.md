# corelab

- **Repositório Completo**: [corelab-fullstack](https://github.com/Mtmozart/challenge-corelab)
- **LinkedIn**: [Matheus Mozart Borges](https://www.linkedin.com/in/matheus-mozart-borges)

## Notas Gerais sobre a Aplicação

### Funcionalidades

- **CRUD Básico de Tarefas**:

  - **Criar**: Adicionar novas tarefas com título, descrição, status e status de favorito.
  - **Ler**: Retornar todas as tarefas ou uma tarefa específica por ID.
  - **Atualizar**: Editar tarefas existentes, incluindo título, descrição e data.
  - **Excluir**: Remover tarefas da lista ou excluir todas as tarefas.
  - **Busca**: Com a indexação e por título, descrição, status, podendo ordenar como quiser.

- **Gerenciamento de Usuários**:
  - **Registro**: Criar novos usuários e autenticar suas credenciais, podendo criar usuários admins, e apenas um admin pode criar outros.
  - **Login**: Autenticar usuários e gerar tokens de acesso.
  - **Logout**: Encerrar sessão do usuário.

### Autenticação

- **Controle de Acesso**:
  - Proteção de rotas e endpoints com autenticação baseada em tokens JWT e NextAuth.

### Envio de E-mails

- **Envio de E-mail em Fila**:

  - Processamento assíncrono de e-mails, utilizando Redis para gerenciamento de filas, como confirmações de registro e notificações.

- **Envio de E-mail Direto**:
  - Envio imediato de e-mails para ações urgentes, como o reset de senha.

### Outras Funcionalidades

- **Reset de Senha**:
  - Implementação de funcionalidade para redefinir senhas.

## corelab-frontend

### Descrição

O projeto `corelab-frontend` é uma aplicação web desenvolvida em React com TypeScript, destinada a gerenciar listas de tarefas. Este frontend interage com uma API para permitir a criação, leitura, atualização e exclusão de tarefas, além de funcionalidades adicionais como marcar itens como favoritos e atribuir cores às tarefas.

### Tecnologias e Ferramentas Utilizadas

- **React**: Biblioteca principal para construção da interface do usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Sass**: Pré-processador CSS para estilização avançada.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **React Router DOM**: Para gerenciamento de rotas na aplicação.
- **ESLint**: Ferramenta para análise estática de código e identificação de problemas.
- **Prettier**: Formatador de código para garantir um estilo consistente.

### Estrutura do Projeto

- **Dependências Principais**:

  - **React** e **React DOM**: Versão 18.3.1.
  - **TypeScript**: Versão 4.4.2.
  - **React Router DOM**: Versão 6.26.0.
  - **Axios**: Versão 1.7.3.
  - **Bus**: Versão 0.1.0.
  - **React Icons**: Versão 5.2.1.
  - **Web Vitals**: Versão 2.1.0.

- **Dependências de Desenvolvimento**:
  - **ESLint** e **Prettier**: Configurados para garantir a qualidade e a formatação do código.
  - **Sass**: Para adicionar suporte a estilos avançados.

### Configuração do Ambiente

1. **Instalação das Dependências**:
   ```bash
   yarn install
   ```
2. **Comando para rodar em dev**:
   ```bash
   yarn start
   ```

## corelab-backend

### Descrição

O projeto `corelab-backend` é uma API desenvolvida utilizando Node.js e o framework NestJS. Esta API é responsável por gerenciar tarefas em um banco de dados PostgreSQL, oferecendo funcionalidades para criar, ler, atualizar e excluir tarefas. A API também permite marcar tarefas como favoritas, gerenciamento de usuário e utiliza Redis como banco para fila com nest bull, devidamente documentado com Swagger, podendo ser consultado na rota comum/api, sendo as respostas dadas por Dto's e proteção com o class-validator, .

### Tecnologias e Ferramentas Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **NestJS**: Framework para construção de APIs e aplicações back-end.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Redis**: Banco de dados em memória baseado em estrutura de dados chave-valor, utilizado para gerenciamento de filas e cache. É amplamente utilizado para operações rápidas de leitura e escrita e pode ser usado para processamento assíncrono de tarefas, como o gerenciamento de filas de e-mail.
- **Prettier**: Formatador de código para garantir um estilo consistente.
- **ESLint**: Ferramenta para análise estática de código e identificação de problemas.
- **TypeORM**: Biblioteca para integração com bancos de dados e ORM (Object-Relational Mapping).

### Scripts

- **Rodar o Projeto**:

  ```bash
  yarn start
  ```

- **Rodar em Desenvolvimento**:

  ```bash
  yarn start:dev
  ```

- **Rodar TypeORM**:

  ```bash
  yarn typeorm
  ```

- **Sincronizar o Schema**:

  ```bash
  yarn typeorm:sync
  ```
