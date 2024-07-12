# CoreNotes - Backend

## Sobre a aplicação

Essa aplicação foi contruída com NodeJs e Express. A aplicação te oferece um servidor para que você possa gerenciar tarefas por meio de operações CRUD(criar, ler, editar e deletar), com possibilidade de marcar como favorito e anexar arquivos na tarefa direto de sua máquina.

VÍDEO EXPLICANDO A APLICAÇÃO --> [https://youtu.be/Qy1c8LcXMKw](https://youtu.be/Qy1c8LcXMKw)

## Deploy & Repositórios

- Repositório frontend --> [repositório frontend](https://github.com/Ryanluc7reis/corelab-web-challenge)
- Repositório backend --> [repositório de backend](https://github.com/Ryanluc7reis/corelab-api-challenge)

- O frontend e backend foram hospedado na vercel.

- Link do projeto em produção --> [CoreNotes projeto](https://corelab-web-challenge-ryanlucas.vercel.app/)

  #### **[O projeto em produção não disponibiliza a funcionabilidade de anexar arquivos!!!]**

## Arquitetura

Seguindo conceitos e boas práticas de uma **Arquitetura Modular**, a aplicação segue da seguinte forma:

- **Pasta "lib"**: Contém um middleware para a conexão com o banco de dados.
- **Pasta "src**: Contém o "server/index.js" como ponto de entrada da aplicação, onde o servidor é inicializado.
- **Pasta "modules"**: Contém diferentes módulos da aplicação, cada um com seu próprio model, schema e service. (Por exemplo: Um módulo específico com o nome de "task", inclui o model schema e o service relacionados à entidade "task".)
- **Pasta "controllers"** : Contém os controladores referente a cada entidade, que são responsáveis por definir as rotas e lidar com as requisições HTTP. (Por exemplo: Uma pasta como o nome de task, irá conter seu controlador específico que vai gerenciar as rotas e as lógicas associadas a "task".)

## Funcionabilidades

**Criar novas tarefas**

- Foi contruído duas rotas utilizando o método .post, seguindo dos endpoints '/createNote' e '/createFavoriteNote', passando por um middleware utilizando celebrate para validar os dados de acordo com seu schema, finalizando com uma função._create()_ fazendo um `req.body` .

**Ler tarefas**

- Foi contruído 4 rotas utilizando o método .get, seguindo dos endpoints '/getNotes', '/getFavoritesNotes' e '/getOneNote', passando por um middleware utilizando celebrate para validar os dados de acordo com seu schema, finalizado com uma função._find()_ e outra função._findOne()_ fazendo um `req.body`.

**Editar tarefas**

- Foi contruído duas rotas utilizando o método .patch, seguindo dos endpoints '/editNote' e '/editFavoriteNote', passando por um middleware utilizando celebrate para validar os dados de acordo com seu schema, finalizando com uma função. _findOneAndUpdate()_ fazendo um `req.body` .

**Deletar tarefas**

- Foi contruído uma rota utilizando o método .delete, seguindo de um endpoint '/deleteNote', passando por um middleware utilizando celebrate para validar os dados de acordo com seu schema, finalizando com uma função._findOneAndDelete_ fazendo um `req.body.id` .

**Editar arquivos das tarefas**

- Foi contruído 2 rotas utilizando o método .patch, seguindo dos endpoints '/files/editFile' e '/files/editFileToDelete', a primeira rota passa por um middleware utilizando multer para fazer o upload do arquivo que é salvo no servidor finalizando com uma função._findOneAndUpdate()_ fazendo um `req.body` e `req.file.path` . A segunda rota passa pela função._findOne()_ fazendo um `req.body.id ` para verificar se existe o arquivo no servidor para ser excluído, seguido de uma função._findOneAndUpdate()_ fazendo um `req.body `.

**Visulizar arquivo no front**

- Foi criado uma rota estática seguido do endpoint '/seeFiles' que acessa a pasta 'uploads' do servidor, onde contém os arquivos salvos que foram anexados no frontend possibilitando você visualizar o arquivo no navegador.

## Tecnologias usadas

- NodeJs
- Express
- Webpack
- Multer
- Eslint / Prettier
- Celebrate
- Joi
- Container Docker
- Mongoose / MongoDB

## Getting Started

### Pré requisitos

- npm or similar

### Instalação

1. Clonar o repositório:

```bash
git clone https://github.com/Ryanluc7reis/corelab-api-challenge
cd corelab-api-challenge
```

2. Instalar depêndencias

```bash
npm install or similar
```

3. Criar um arquivo '.env' na pasta raíz do projeto e inserir

```bash
MONGODB_URI=mongodb+srv://devryantask:ZrYf7rPkzGNW8ecY@clustertaksmanager.8iltbeh.mongodb.net/devryantask?retryWrites=true&w=majority
PORT=4444
```

4. Iniciar aplicação

```bash
npm start
```

---

**Autor:** [Ryan Lucas Ferreira Reis]  
**Email:** [ryanluc.dev18@gmail.com]  
**Data:** [11/07/2024]
