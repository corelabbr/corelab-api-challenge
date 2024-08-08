# Corelab - Backend

This is the backend part of the project, built with Node.js, Express, and TypeScript, following clean architecture principles. The backend manages the notes, handling creation, editing, deletion, and file attachments.

## Repositories
- Backend: https://github.com/kefflen/corelab-api-challenge
- Frontend: https://github.com/kefflen/corelab-web-challenge
  
## Installation

To get started with the backend, follow these steps:

1. **Clone the repository:**
    
    ```
    git clone https://github.com/kefflen/corelab-api-challenge.git
    ```
    
2. **Install dependencies:**
    
    ```
    npm install
    ```
    
3. **Set up environment variables:**
    
    Create a `.env` file in the root directory and add the necessary environment variables.
    ```
    # The default port is 8080
    PORT=8080
    ```
4. **Run the application:**
    
    ```
    npm run dev
    ```
    
    This will start the server on `http://localhost:<PORT>`. Port is 8080 by default
   
## Testing

To run tests using Jest:

```
npm test
```

### Linting and Formatting

To run ESLint:

```
npm run lint
```

To format code with Prettier:

```
npm run format
```

## Technologies

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast web framework for Node.js.
- **TypeScript**: TypeScript is a strongly typed programming language that builds on JavaScript.
- **Jest**: Testing framework with a focus on simplicity.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Husky**: Tool for maintaining code quality and consistency.
- **Prettier**: An opinionated code formatter.
- **ESLint**: Statically analyzes the code to quickly report and find problems.
- **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for uploading files.

## Architecture

The backend follows a clean architecture, which separates concerns and promotes a scalable and maintainable codebase. Here's an explanation of the file structure:

```
src/
├── modules/
│   └── notes/
│       ├── adapter/
│       │   └── mongo/
│       │       ├── note.model.ts
│       │       ├── note.mongo.mapper.ts
│       │       ├── note.mongo.repository.ts
│       ├── domain/
│       │   ├── dto/
│       │   │   ├── createNoteDTO.ts
│       │   │   ├── updateNoteDTO.ts
│       │   ├── note.entity.ts
│       │   ├── note.repository.ts
│       │   ├── note.service.ts
│       ├── note.controllers.ts
│       ├── note.routes.ts
│       ├── zod.schemas.ts

```

### Adapter

- **mongo**: Contains MongoDB specific implementations.
    - `note.model.ts`: Defines the Mongoose schema and model for notes.
    - `note.mongo.mapper.ts`: Maps MongoDB data to the domain entities and vice versa.
    - `note.mongo.repository.ts`: Implements the repository pattern for data access using MongoDB.

### Domain

- **dto**: Data Transfer Objects used for data validation and transfer between layers.
    - `createNoteDTO.ts`: Defines the structure for creating a new note.
    - `updateNoteDTO.ts`: Defines the structure for updating an existing note.
- `note.entity.ts`: Defines the Note entity, encapsulating all business logic and rules.
- `note.repository.ts`: Defines the repository interface for abstracting data access operations.
- `note.service.ts`: Contains the business logic for handling notes, interacting with the repository.

### Controllers and Routes

- `note.controllers.ts`: Defines the controllers for handling HTTP requests and responses.
- `note.routes.ts`: Sets up the API routes for the notes module.
- `zod.schemas.ts`: Defines Zod schemas for validating request data.

## Importance of Husky and lint-staged
Husky and lint-staged are crucial tools for maintaining code quality and consistency. 
By using Git hooks, Husky ensures that certain scripts are executed at specific points in the Git workflow, 
such as before making a commit. lint-staged works in conjunction with Husky to run linters and formatters on staged files, 
ensuring that only the relevant files are processed. Here’s why they are essential:

### Prettier

- **Code Formatting**: Ensures that all code follows a consistent style. This is particularly important in a team environment where multiple developers are working on the same codebase.
- **Automated Formatting**: Automatically formats your code before it gets committed, reducing the need for manual formatting and code review comments related to style issues.

### ESLint

- **Code Quality**: Analyzes your code to find and fix problems, ensuring that it adheres to best practices and coding standards.
- **Error Prevention**: Catches syntax errors, unused variables, and other common mistakes before they get committed, reducing the likelihood of bugs.

### Jest

- **Testing**: Runs your test suite to ensure that new code doesn’t break existing functionality.
- **Continuous Integration**: Acts as a safeguard to prevent untested or failing code from being committed, maintaining the stability of the codebase.

### How Husky is Set Up
Husky is configured to run specific tasks at various points in the Git workflow. In this project, it is set up to run lint-staged before every commit.

```json
// package.json
{
  "lint-staged": {
    "**/*.{js,ts}": [
      "eslint --fix",
      "prettier --write",
      "npm run test -- --findRelatedTests --bail --passWithNoTests"
    ]
  }
}
```

This configuration ensures that:

1. **ESLint**: Checks for any linting errors.
2. **Prettier**: Formats the code.
3. **Jest**: Runs the tests.

By automating these steps, Husky helps maintain a high standard of code quality and consistency, allowing developers to focus on writing features and fixing bugs rather than formatting and error-checking.
