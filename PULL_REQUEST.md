## Corelab Challenge:

Instructions on how to install and run the application.

### Instalation

1. It it necessary to have a MongoDB cluster set up so the API can use it to store and read the Notes data.

2. Use npm to install the necessary dependencies.

```bash
npm install
```

3. Create a `.env` file in the root folder of the project and add two environment variables.

```bash
PORT=3000
```

```bash
DATABASE_URL=THE_URL_TO_YOUR_MONGO_CLUSTER
```

4. Execute the application.

```bash
npm run dev
```

### The Project

It is a Node.js API with Express and TypeScript that has the route "/notes" with endpoints for creating, retrieving, deleting, and updating data.

It uses Mongoose to interact with the MongoDB database and follows RESTful architecture to a fair extent.

For the purposes of this challenge, CORS is configured to allow access from any origin.

### How it works

There are five endpoints available for handling the data.

#### get /notes/

Retrieves all the notes stored in the database and returns them to the requester.

#### get /notes/:text

For a filtered "Notes" request, it receives a text parameter, which can be a word or a fragment. It finds and returns all notes that contain that text in either the title or the content.

#### post /notes/

Used to save a new note to the database. It receives the attributes in the body of the request.

### delete /notes/:id

Used to remove a note from the database. It requires the note's ID as a parameter.

### patch /notes/:id

Used to update a note in the database. It requires the note's ID as a parameter and the updated data in the body of the request.
