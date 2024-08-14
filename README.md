# CoreNotes Backend

This is the backend for the CoreNotes application, built with AdonisJS using TypeScript. It provides an API for managing to-do lists, with features like CRUD operations, color coding, and favoriting items.

## Getting Started

> [!IMPORTANT]  
> Make sure you have Node.js, npm, and PostgreSQL installed on your machine before proceeding.

To run the project locally, follow these steps:

### Prerequisites

- **Node.js**: >= 20.6
- **npm**: ^8.5.5
- **PostgreSQL**: Ensure you have a PostgreSQL database set up.

> [!TIP]
> You can check if Node.js and npm are installed by running `node -v` and `npm -v` in your terminal.

### Installation

1. **Clone the repository:**

  ```
  git clone -b core-notes https://github.com/izJoey/corelab-api-challenge.git
  ```

2. **Navigate to the project directory:**

  ```
  cd corelab-api-challenge
  ```

3. **Install the dependencies:**

  ```
  npm install
  ```

> [!NOTE]
> The npm install command will install all necessary dependencies listed in the package.json file.

4. **Configuration:**

Update the database configuration in the .env file:

    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_DATABASE=your_database_name

> [!IMPORTANT]
> Make sure the PostgreSQL database is running, and the credentials in the .env file match your database setup.

5. **Running the Application:**

Run database migrations:
  ```
  node ace migration:run
  ```

Start the development server:
  ```
  npm run dev
  ```

API will be available at:

    http://localhost:3333

> [!CAUTION]
> Ensure that port 3333 is free on your machine, as AdonisJS will use it by default.

#### API Routes

Here are the available API routes for testing:

    GET /
    Returns a welcome message.

    GET /notes
    Fetch all notes.

    POST /notes
    Create a new note.

    PUT /notes/:id/title
    Update the title of a note.

    PUT /notes/:id/content
    Update the content of a note.

    PUT /notes/:id/color
    Update the color of a note.

    PUT /notes/:id/favorite
    Toggle the favorite status of a note.

    DELETE /notes/:id
    Delete a note.

> [!TIP]
> You can use tools like Postman or Insomnia to test these routes.




#### Troubleshooting

> [!WARNING]
> If you encounter errors during installation or while running the application, ensure that your Node.js, npm, and PostgreSQL versions match the prerequisites. Double-check the .env file for correct database configurations.

