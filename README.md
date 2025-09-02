## Corelab Challenge: Corenotes API

## 📖 Index
- [Description](#description)
- [Installation](#installation)
- [Used Tech](#used-tech)

## Description  <a name="description"></a>
This repository contains the implementation of the Corenotes API using NestJS, as part of the evaluation for the Full-stack Developer Role on the company.

The API has been designed to manage notes with functionalities to create, read, update, and delete notes, as well as an authentication system that prevents misaccess to other users' data.

The app counts with Redis for caching some of the data, in order to guarantee better performance and scalability.

## Installation <a name="installation"></a>
In order to use the database locally, you require a Redis database to be used as the application's cache. The app provides support for both local environments (such as Docker Redis containers or the Redis CLI) or the Redis' dedicated databases.

If you're using a dedicated Redis DB, you should define its configs at `./.env` in the following way (mock values are being used):

```
NODE_ENV=production
...
# Redis Cache Production Settings
REDIS_PRODUCTION_HOST="hostname-redis-example"
REDIS_PRODUCTION_PORT=6379
REDIS_PRODUCTION_USER=default
REDIS_PRODUCTION_PASSWORD=root
```

If you're going for Redis CLI or a Redis Image being run on Docker, the application won't require user and password to authenticate you in the database. It's enough to only set the following variables:

```
NODE_ENV=development | local | test
...
# Redis Cache Settings
REDIS_HOST=localhost
REDIS_PORT=6379
```

Since the application uses AES-256 cryptography, it's mandatory to set it's two keys. You can generate them [here](https://acte.ltd/utils/randomkeygen), then set them in the `./.env` file the following way:

```
# Cryptography Settings
CRYPTO_SECRET=(use the 'Basic 8' generated key)
CRYPTO_IV=(use the 'Basic 16' generated key)
```

As for the JWT, the `APP_SECRET` variable should be set. Any value will do, but I personally recommend you to use a key provided by the generator above.

```
APP_SECRET=something_nice
```

As for the last configs, you shall set any PORT you desire, as long as it's not 3000 or the port being used by your local front-end application.

Since we're using Prisma, you only need to set the DB's connection string in the `DATABASE_URL` variable. The application supports both PostgreSQL and MySQL, so you can choose any of them. The connection string should be set in the following way:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Once everything's set, you can install the dependencies by running:

```bash
npm install
```

Then, you can run the application in development mode by running:

```
npx prisma generate

npx prisma migrate <migration-name>

npm run start:dev
```

After that, the API should be up and running. To access its Swagger documentation, you only need to add the `/swagger` path after the API's URL on your browser. For example, if you're running the API on `http://localhost:5000`, you should access `http://localhost:5000/swagger`.

## Used Tech <a name="used-tech"></a>
- [Axios](https://www.npmjs.com/package/axios)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Cache Manager](https://www.npmjs.com/package/cache-manager)
- [Cacheable](https://www.npmjs.com/package/cacheable)
- [Class Transformer](https://www.npmjs.com/package/class-transformer)
- [Class Validator](https://www.npmjs.com/package/class-validator)
- [Crypto](https://www.npmjs.com/package/crypto)
- [CORS](https://www.npmjs.com/package/cors)
- [Date-fns](https://www.npmjs.com/package/date-fns)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/)
- [ESLint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [Faker](https://www.npmjs.com/package/faker)
- [Jest](https://jestjs.io/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Keyv](https://www.npmjs.com/package/keyv)
- [MySQL](https://www.mysql.com/)
- [NestJS](https://nestjs.com/)
- [NestJS-Zod](https://www.npmjs.com/package/nestjs-zod/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Prettier](https://www.npmjs.com/package/prettier)
- [Redis](https://redis.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Swagger](https://swagger.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)