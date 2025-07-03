# CoreNote

CoreNote is an app designed for simple and intuitive note management. It is built using [Next.js](https://nextjs.org/) for the frontend [APP](https://github.com/iuryveloso/corelab-api-challenge), and [AdonisJS](https://adonisjs.com/) + [MySQL](https://www.mysql.com/) for the backend REST [API](https://github.com/iuryveloso/corelab-api-challenge).

## Installation: 

[Docker](https://www.docker.com/) must be installed on your system.

Clone the [API](https://github.com/iuryveloso/corelab-api-challenge) repository.

Create a copy of the ".env.example" file in the app's root folder. Rename it to ".env" and change the necessary information.

Open the terminal and run the command ```docker compose up -d```. Next, run the command ```docker exec -it corenote-api  bash``` to access the application container, and then run the command ```node ace migration:run``` and type "Y" for the question that appears.

Finally, open an API client (like [Postman](https://www.postman.com/)) and go to [http://localhost:3333](http://localhost:3333). If you already run the frontend [APP](https://github.com/iuryveloso/corelab-api-challenge) instructions, just open your browser and go to [http://localhost:3000](http://localhost:3000). Enjoy!
