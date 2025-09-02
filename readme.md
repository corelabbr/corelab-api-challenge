# 📝 Pull Request: Todo List API

This PR introduces a comprehensive **Todo List API** built with modern Node.js. It's designed to provide a robust and scalable backend for the Todo List application, featuring **TypeScript**, **Fastify**, and **Prisma** for data management.

-----

### **Key Features**

  * **API Endpoints:** Provides a full set of RESTful endpoints to manage todos.
  * **CRUD Operations:** Supports **Create**, **Read**, **Update**, and **Delete** operations for todo items.
  * **Favorite/Unfavorite:** Includes dedicated endpoints to mark tasks as favorites.
  * **Filtering and Search:** Provides search functionality based on todo titles.

-----

### **Technologies Used**

  * Node.js
  * Fastify
  * TypeScript
  * Prisma
  * PostgreSQL
  * Zod
  * Docker
  * Vitest
  * Supertest

-----

### **Technical Highlights**

The API follows a clean architecture to ensure high performance, reliability, and maintainability.

  * **Database Management:** **Prisma** is used as the ORM (Object-Relational Mapper) to interact with the **PostgreSQL** database. It provides a type-safe and efficient way to handle database queries and migrations.
  * **Validation:** **Zod** is implemented for robust schema validation, ensuring all incoming data conforms to the expected structure.
  * **Dependency Management:** The project uses a clear dependency injection pattern to enhance testability and modularity.
  * **Testing:** The API includes comprehensive unit and integration tests written with **Vitest** and **Supertest**, ensuring all endpoints and services function as expected.
  * **Docker:** The project includes a `docker-compose.yml` file, making it easy to set up the database and run the application in a consistent environment.

### **Project Structure**

The project structure is organized to promote a logical separation of concerns.

  * **`src`**: Contains the core application logic.
      * `http`: Manages the HTTP server and routing.
          * `controllers`: Handles request routing and business logic.
          * `presenters`: Formats responses to be sent to clients.
          * `Routes`: Defines API endpoints and their handlers.
      * `use-cases`: Manages the application's core logic and interacts with the database.
      * `repositories`: Handles database access.
      * `entities`: Defines the API entities.
      * `errors`: Defines custom errors for the application.
      * `config`: Defines application configuration, like environment variables.

-----

### **Prerequisites**

Before you begin, you'll need the following tools installed on your machine:

  * Git
  * Node.js
  * Docker

-----

### **Getting Started**

To get the API up and running, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Aldovani/corelab-api-challenge.git
    cd corelab-api-challenge
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the project's root directory and add your database connection string and any other required variables.

    ```env
    DATABASE_URL="postgresql://admin:admin@localhost:5432/core-notes?schema=public"
    PORT=8080
    DATABASE_USER="admin"
    DATABASE_PASSWORD="admin"
    DATABASE_NAME="core-notes"

    Alternatively, you can copy the provided `.env.example` file

    ```bash

3.  **Start the database with Docker:**

    ```bash
    docker-compose up -build
    ```


### Run the tests

1.  **Run the tests:**

    ```bash
    npm run test // unitary tests
    npm run test:e2e // e2e tests

    ```
