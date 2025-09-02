# Pull Request – Backend Setup with NestJS, Prisma, SQLite & Jest

## 📝 Overview

This PR sets up the api for the Todo List application using **NestJS** and **Prisma ORM** with **SQLite** as the database.

It includes a centralized **PrismaService** for managing database connections, module setup via `AppModule`, and testing with **Jest**.

---

## 🔨 Main Features

### PrismaService

- Extends `PrismaClient` for type-safe database access.
- Implements `OnModuleInit` to connect automatically when the module starts.
- Provides `enableShutdownHooks` to gracefully close the NestJS app when Prisma emits a `beforeExit` event.

#### Key Methods

1. `onModuleInit()`
   - Connects to the database when the module is initialized.
2. `enableShutdownHooks(app: INestApplication)`
   - Ensures proper shutdown of the application on Prisma `beforeExit`.

#### PrismaService Example

```ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

### AppModule

- Imports the `TodosModule` (handles CRUD and business logic for todos).
- Provides the `PrismaService` globally for dependency injection.

```ts
@Module({
  imports: [TodosModule],
  providers: [PrismaService],
})
export class AppModule {}
```

### Testing

- Configured **Jest** for unit and integration tests.
- `PrismaService` can be mocked for isolated tests.
- Ensures reliability of database operations and module initialization.

---

## 🏗️ Technologies Used

- **NestJS** – Scalable Node.js backend framework
- **Prisma ORM** – Type-safe database client
- **SQLite** – Lightweight SQL database (dev/testing)
- **TypeScript** – Type safety
- **Jest** – Testing framework

---

## 📂 Project Structure (Key Components)

- **PrismaService** – Manages database connection and shutdown hooks.
- **AppModule** – Main application module importing feature modules.
- **TodosModule** – Module for managing todos (CRUD, business logic).

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
# or
# yarn
# pnpm install
```

### Configure environment variables

```env
DATABASE_URL="file:./dev.db"
```

### Generate Prisma client

```bash
npx prisma generate
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start backend server

```bash
npm run start:dev
```

### Run tests

```bash
npm run test
# or
# npm run test:watch
```

### Verify backend

- Ensure Prisma connects successfully.
- All modules and tests should run without errors.

---

## ✅ Notes

- This PR establishes the foundation for all backend features.
- `PrismaService` ensures consistent DB access across the application.
- SQLite is used for local development and testing; production can switch to PostgreSQL/MySQL.
- Jest tests provide confidence in the database layer and service initialization.
