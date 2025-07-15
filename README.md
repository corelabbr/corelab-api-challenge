## Corelab Challenge:

You are tasked with building a web application that allows users to create and manage their to-do lists. The application should consist of a responsive webpage built in React, and an API built in Node.js to store and manage the to-do lists.

### The repositories

The [frontend repository](https://github.com/corelabbr/corelab-web-challenge)

If you feel more comfortable, you can pick another React framework and show us your skills.

The [backend repository](https://github.com/corelabbr/corelab-api-challenge)

If you feel more comfortable, you can pick another Node JS framework and show us your skills.

### The Layout

Open the [layout mockup](https://www.figma.com/file/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=7%3A2&t=ANTOTiqjqGWYuoUr-0) in desktop and mobile version and follow this design as much as possible.

### The application should have the following functionality:

1. Users should be able to create, read, update, and delete to-do items using the API.
2. Users should be able to mark an item as a favorite.
3. Users should be able to set a color for each to-do item.
4. The React frontend should display the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.
5. The favorited items should be displayed at the top of the list.

### Technical Requirements:

1. The backend API should be built in Node.js framework and use a database of your choice (e.g., MongoDB, PostgreSQL, etc.).
2. The frontend should be built in React and use modern web development tools and best practices.
3. The application should be responsive and visually appealing.

### Deliverables:

1. A link to a GitHub repository containing the complete source code for the project.
2. A written description of how to set up and run the application locally.

### Evaluation Criteria:

1. Code Quality
2. Code Format
3. Code Perfomance
4. Frontend Design
5. If your code is Easily Readable
6. Mobile First approach
7. Code Responsability
8. Features Work
9. Responsiveness
10. Does the application meet the functionality requirements listed above?
11. Is the code well-organized, easy to read, and well-documented?
12. Are modern web development tools and best practices used?
13. Is the application visually appealing and responsive?

### Backend

Repository:

1. Node: ^16.15.0
2. NPM: ^8.5.5
3. Framework: Adonis TS or any other node framework you know.
4. Database: Choose your own, you can even save in memory.

### Frontend

Repository:

1. Node: ^16.15.0
2. NPM: ^8.5.5
3. Framework: React TS
4. Sass or other preprocessor

### Want to impress us even more?

If you feel comfortable and want to impress us even more, you can do the following:

1. Work on correct types and interfaces
2. Work on eslint rules
3. Work prettier config
4. Work on docker containers
5. Work on tests
6. Work on CI/CD

### What to do when you finish?

Create a file PULL_REQUEST.md where you will describe what you did and how in as much detail as possible. Feel free to add videos for better explanation.

Create a new pull request using the same branch name for Backend and Frontend

Send us the pull requests and that's all!

#### Good luck! The sky is the limit 🚀

---

## Getting Started

This repository contains the Node.js (AdonisJS) API for the CoreNotes application. It is recommended to run the full stack via Docker for the simplest setup.

### Running with Docker (Recommended)

**Prerequisites:**

- Docker Desktop installed and running.

**Steps:**

1.  Clone both the frontend (`corelab-web-challenge`) and backend (`corelab-api-challenge`) repositories into the same parent directory.

    ```
    your-main-folder/
    ├── corelab-api-challenge/
    └── corelab-web-challenge/
    ```

2.  In the root `your-main-folder`, create a `docker-compose.yml` file with the following content:

    ```yaml
    version: '3.8'

    services:
      backend:
        build: ./corelab-api-challenge
        container_name: corelab-api
        ports:
          - '3333:3333'
        volumes:
          - ./corelab-api-challenge:/app
          - /app/node_modules
        environment:
          - DATABASE_URL=file:./dev.db

      frontend:
        build: ./corelab-web-challenge
        container_name: corelab-web
        ports:
          - '3000:3000'
        volumes:
          - ./corelab-web-challenge:/app
          - /app/node_modules
        depends_on:
          - backend
    ```

3.  From the root directory, run:
    ```bash
    docker compose up --build
    ```
4.  The API will be available at `http://localhost:3333` and the frontend at `http://localhost:3000`.

### Running Locally (Without Docker)

**Prerequisites:**

- Node.js `v16.15.0`
- NPM `v8.5.5`

1.  Navigate to the `corelab-api-challenge` directory and run the setup commands:
    ```bash
    npm install
    cp .env.example .env
    node ace generate:key
    npx prisma migrate dev
    npm run dev
    ```
2.  In a new terminal, navigate to the `corelab-web-challenge` directory and run:
    ```bash
    npm install
    npm start
    ```

---

## API Endpoints

The API provides full CRUD (Create, Read, Update, Delete) functionality for managing notes.

### List All Notes

- **Endpoint:** `GET /notes`
- **Description:** Returns a JSON array of all note objects. Notes marked as favorite (`isFavorite: true`) are always listed first.
- **Response:** `200 OK` with an array of notes.

### Create a Note

- **Endpoint:** `POST /notes`
- **Description:** Creates a new note.
- **Request Body (JSON):**
  ```json
  {
    "title": "string",
    "content": "string (optional)",
    "isFavorite": "boolean (optional)",
    "color": "string (hex, optional)"
  }
  ```
- **Response:** `201 Created` with the new note object.

### Update a Note

- **Endpoint:** `PATCH /notes/:id`
- **Description:** Updates one or more fields of an existing note. Replace `:id` with the actual ID of the note.
- **Request Body (JSON):** Provide only the fields you want to change.
  ```json
  {
    "title": "Updated Title",
    "isFavorite": true
  }
  ```
- **Response:** `200 OK` with the updated note object.

### Delete a Note

- **Endpoint:** `DELETE /notes/:id`
- **Description:** Deletes the note with the specified ID.
- **Response:** `204 No Content` with an empty body on successful deletion.
