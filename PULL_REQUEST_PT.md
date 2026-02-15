# Coralab API

### Esta é uma API para criação e modificação de notas, desenvolvida para <a href="https://www.corelab.com.br/pt">Corelab</a>

> Status: Finalizado!

</br>

## 💻 Rodando a API
```bash
# Install (Node version: ^16.15.0)
$ npm install
```
Você precisa configurar o .ENV seguindo o exemplo .ENV.EXEMPLE.

```bash
# Run the api
$ npm run dev or 
```
Open [http://localhost:3333](http://localhost:3333) to see the result.

## 🗺️ Endpoints

Method        | URL                   | Descrição
------------- | --------------------- |-------------
GET           | /notes/favorites      | Devolve todas a notas favoritas.
GET           | /notes/others         | Devolve todas a notas que não são favoritas.
GET           | /notes/search/:param  | Apresenta as notas de acordo com o param.
POST          | /notes                | Cria uma nova nota.
PUT           | /notes/:id            | Atualiza uma nota de acordo com o id.
DELETE        | /notes/:id            | Deleta uma nota de acordo com o id.

## ✨ Links

+ <a href="https://github.com/JuanLima10/Corelab-Web" target="_blank">Repositório WEB</a>

+ <a href="https://github.com/corelabbr/corelab-api-challenge" target="_blank">Repositório da Corelab</a>

+ <a href="https://github.com/JuanLima10/Corelab-Web/blob/corelab-challenge-juan/PULL_REQUEST.md" target="_blank">Documentação em Inglês</a>

## 🧪 Tecnologias:

+ Adonis
+ TypeScript
+ PostgreSQL