link to github repository [back-end repository](https://github.com/KaduViana1/corelab-api)

## About the API

This AdonisJS api has 4 endpoints to:

1. Get all the todos
2. Create a todo
3. Update a todo
4. Delete a todo

I choose PostgreSQL to use as a database.
I used the Lucid ORM to make migrations to the database and to create and use Models to create the database interactions.
The create and update endpoints are protected with validators to ensure that the data is beeing received in the correct format and to return error messages when something is not right.

## Esling and Prettier

I changed the package.json file to change some prettier adn eslint configurations.

In the eslint I added the "no-console" to make sure that no debugging console logs go into production and turned off the "prettier error" rule, since I use prettier to format on save ensuring that the code will always be formatted.

In the prettier configs I turned on the semi-colons config to true, since I'm used to code with semi-colons and added the "tabs-width" to 2.

Both back-end and front-end repositories have the same eslint and prettiers configurations.

## Working with Docker

I used a docker container to run the PostgreSQL data-base and created a Dockerfile to containerize this API.
In the repository there is a docker-compose file with the configurations to run the api and the database containers and make them work together, you will just need to add the environment variables, you can create a .env file and use the .env.example as reference. **REMEMBER TO CHANGE THE "PG_HOST" IN THE .ENV FILE TO "postgres" SO THE BACKEND CONTAINER CAN CONNECT TO THE DATABASE CONTAINER**

I also created a monorepo repository in the github with the front-end,back-end and database repositories and docker-compose to run all the containers.
The [monorepo repository](https://github.com/KaduViana1/corelab-monorepo)

## How to run the application

You can either run the application on your machine oy using docker containers.

### Local:

To run in your machine you will need to add a .env file with the necessary environment variables for the application and to your database connection (use .env.example as a reference).
If you want to use docker just for the database you can comment the "adonis_api" service from the docker compose and doa a "docker compose up -d" command on the terminal (ensuring you have the postgres necessary variables on your .env file)
Then you can run "npm install" to install all dependencies and "npm run dev" to run the application in development mode. The first time you run the database you should have to run a "node ace migration:run" or "node ace migration:fresh" to make the database migrations. Done, the api is ready to be used!

(To use in production you have to run "npm run build", paste the .env file in the "build" folder, cd into the build folder and run "node server.js")

### Using Docker:

This repository has "Dockerfile" and "docker-compose.yaml" files to easily run the API using docker containers.
You'll just have to create a .env file with the needed environment variables (.env.exemple as reference).
Run "docker-compose up -d", the first time doing this procedure you will have to run "node ace migration:run" or "node ace migration:fresh" in the api container terminal to run the migrations to configure the API. Wait for the containers to run and done, the API is ready to use!
**REMEMBER TO CHANGE THE "PG_HOST" IN THE .ENV FILE TO "postgres" SO THE BACKEND CONTAINER CAN CONNECT TO THE DATABASE CONTAINER**
