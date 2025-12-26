```markdown
# CoreLab API Project

Welcome to the CoreLab API project! This file provides an overview of the Nest.js API project, highlighting features, modules, and instructions on how to run the project using Docker.

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Authentication Module with Auth Guards](#authentication-module-with-auth-guards)
  - [User Module](#user-module)
  - [Task Module](#task-module)
- [Usage with Docker](#usage-with-docker)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The CoreLab API project is built using Nest.js, TypeORM, Docker for containerization, and PostgreSQL as the database. It includes an authentication module with auth guards, a user module with CRUD operations, and a task module with complete CRUD functionality for authenticated users.

## Getting Started

To run the CoreLab API project locally, follow these steps:

1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the project root and add the following:
   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=admin
   DB_PASSWORD=admin
   DB_NAME=corelab
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```
   The API will be accessible at `http://localhost:3000` by default.

## Features

### Authentication Module with Auth Guards

The authentication module provides secure user authentication and includes auth guards to protect routes.

### User Module

- **User Entity**: A User entity is created, representing the user data structure.
- **User Module and Services**: User module includes services for user registration, retrieval, update, and deletion.

### Task Module

- **Task Module and Services**: Task module provides complete CRUD functionality for tasks, ensuring user authentication for data integrity.

## Usage with Docker

To run the CoreLab API project using Docker, ensure you have Docker and Docker Compose installed. Then, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/corelab-api.git
   cd corelab-api
   ```

2. Create a `.env` file in the project root with the following content:
   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=admin
   DB_PASSWORD=admin
   DB_NAME=corelab
   ```

3. Run Docker Compose:
   ```bash
   docker-compose up -d
   ```

   The API will be accessible at `http://localhost:3000` by default.
