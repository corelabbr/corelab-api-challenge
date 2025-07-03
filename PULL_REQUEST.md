# CoreNote API

## Features

- **Simple Endpoints** to get notes in json format, besides create, update, delete and restore notes.

- **Data validation** across all endpoints.

## Deliverables

- The api was built with **AdonisJS 6** and **MySQL 8**, designed to be used with the frontend app built with **Next.js 15**.

- The application communicates with the database using **Lucid ORM**, a component of the AdonisJS Framework.

- Code was written using **ESLint** and **Prettier** for formatting and best practices, as well as **TypeScript** to streamline development.

- **Functional tests** were performed with **JAPA**, already incluse in AdonisJS Framework.

- **Docker containers** were utilized with **Docker Compose**, simplifying deployment to production.

## Installation:

1. [Docker](https://www.docker.com/) must be installed on your system.

2. Clone the [API](https://github.com/iuryveloso/corelab-api-challenge) repository.

3. Create a copy of the ".env.example" file in the app's root folder. Rename it to ".env" and change the necessary information.

4. Open the terminal and run the command ```docker compose up -d```. Next, run the command ```docker exec -it corenote-api  bash``` to access the application container, and then run the command ```node ace migration:run``` and type "Y" for the question that appears.

5. Finally, open an API client (like [Postman](https://www.postman.com/)) and go to [http://localhost:3333](http://localhost:3333). If you already run the frontend [APP](https://github.com/iuryveloso/corelab-web-challenge) instructions, just open your browser and go to [http://localhost:3000](http://localhost:3000). Enjoy!
