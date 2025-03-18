# Core Note API

## Project description

Aplication to help manage tasks and reminders.
The project has customization by colors, search and favorites.

For more information, see [PULL_REQUEST.md](PULL_REQUEST.md).

### The application has the following features

- Users are able to create, read, update and delete pending tasks using the API.
- Users can mark an item as a favorite.
- Users can set a color for each task item.
- User task list in a responsive and visually appealing way, with the ability to filter items.
- Favorite items are displayed at the top of the list.
- The application was made to adapt to smaller screens in the best possible way.

## Tecnologies

- Typescript
- NestJS
- TypeORM and PostgreSQL

## Recommends

- Insomnia
- Dbeaver
- Docker

## Instructions

### Install dependencies

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Lintian and formatting

Lintian:  
```bash
yarn run lint
```

Formatting:  
```bash
yarn run format
```

## Docker

```bash
$ docker compose -f docker-compose.yml up
```

Or

```bash
$ docker compose -f docker-compose.yml up -d
```

To keep running without log.

Images: Nodejs 22 (Alpine) and PostgreSQL 17.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE.md).
