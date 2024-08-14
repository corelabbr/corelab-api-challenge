#### Overview

The API is built using AdonisJS with TypeScript and PostgreSQL. It provides CRUD operations for managing to-do items, along with additional features like color coding and favoriting notes.


#### Implementation Details

1. **Routes**

The routes are defined in routes.ts. The API endpoints are as follows:

    /: Returns a welcome message.
    /notes:
        GET /: Fetches all notes.
        POST /: Creates a new note.
    /notes/:id:
        PUT /title: Updates the title of a note.
        PUT /content: Updates the content of a note.
        PUT /color: Updates the color of a note.
        PUT /favorite: Toggles the favorite status of a note.
        DELETE /: Deletes a note by its ID.

2. **Database Migration**

The database migration script create_todo_table.ts creates a notes table with the following columns:

    id: Primary key, auto-incrementing.
    title: String, nullable.
    content: String, nullable.
    color: String, nullable.
    favorite: Boolean, nullable.
    created_at: DateTime, auto-created.
    updated_at: DateTime, auto-created and updated on each modification.

3. **Note Model**

The Notes model is defined in models/notes.ts. It extends the BaseModel class from AdonisJS Lucid ORM and contains the properties mentioned above. Represent notes in the database.

4. **Notes Controller**

The NotesController in controllers/notes_controller.ts handles all the API requests related to notes. It includes methods for fetching notes, creating new notes, updating existing notes, and deleting notes. The methods follow RESTful conventions and perform validation using AdonisJS validator.
