# Desafio Corelab - API

## Descrição
Desafio da empresa Corelab para a criação de uma API e cliente para a API. Os requisitos estão listados no arquivo Leiame.md ou README.md deste repositório.

Ele foi desenvolvido usando Node.js, Express.js e MariaDB.

## Requisitos
* Node.js versão 20.9.0
* NPM versão 10.1.0
* MariaDB versão 11.0.6

## Instalação e execução
1. Crie um banco de dados com o nome _todoDB_
2. Clone o repositório: _git clone git@github.com:CiceroWesley/corelab-api-challenge.git_
3. Acesse a pasta do projeto _cd corelab-api-challenge_
4. Instale as dependências _npm install_
5. Acesse o arquivo _./config/db.js_ e altere as credênciais de acesso ao seu MariaDB
6. Rode o projeto _npm run start_

## Rotas da API
### Retorna todas as tarefas
**GET /tasks?q=q** | Query opcional

### Retorna tarefa por id
**GET /task/:id**

### Cria tarefa
**POST /task**  
**Body: title, description, favorite** | Opcionais

### Editar tarefa
**PATCH /task/:id**  
**Body: title, description** | Opcionais

### Editar cor da tarefa
**PATCH /task/color/:id**  
**Body: colorP** | Opcional

### Favoritar/desfavoritar
**PATCH /task/favorite/:id**  

### Deletar tarefa
**DELETE /task/:id**  

### Deletar todas tarefas
**DELETE /tasks**  
