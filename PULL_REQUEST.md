# Coralab API

### This is a API to create and modified notes, developed to <a href="https://www.corelab.com.br/pt">Corelab</a>

> Status: Finished!

</br>

## 💻 Running the app
```bash
# Install (Node version: ^16.15.0)
$ npm install
```
You need to configurate the .ENV document following the example .ENV.EXEMPLE.

```bash
# Run the api
$ npm run dev or 
```
Open [http://localhost:3333](http://localhost:3333) to see the result.

## 🗺️ Endpoints

Method        | URL                   | Description
------------- | --------------------- |-------------
GET           | /notes/favorites      | Displays all Favorite notes.
GET           | /notes/others         | Displays all notes that are not Favorites.
GET           | /notes/search/:param  | Shows the notes according to the param.
POST          | /notes                | Create a new note.
PUT           | /notes/:id            | Update a note according to the id.
DELETE        | /notes/:id            | Delete a note according to the id.

## ✨ Links

+ <a href="https://github.com/JuanLima10/Corelab-Web" target="_blank">Web repository</a>

+ <a href="https://github.com/corelabbr/corelab-api-challenge" target="_blank">Corelab repository</a>

+ <a href="https://github.com/JuanLima10/Corelab-Web/blob/corelab-challenge-juan/PULL_REQUEST_PT.md" target="_blank">Portuguese documentation</a>

## 🧪 Technologies:

+ Adonis
+ TypeScript
+ PostgreSQL