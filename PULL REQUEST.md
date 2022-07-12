
## API Documentation

This API uses postgres database and has in the /vehicles search engine a strategy called fulltext search, it was implemented specifically for postgress

## API Install dependences
yarn or npm install

## API Run adonis migrations for database
node ace migration:run

## API Scripts Run

Use this comands in npm or yarn for run this API

| Query   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `yarn dev` | `local` | This comand run in locale. |
| `yarn build` | `local` | This comand run in locale. |
| `yarn start` | `local` | This comand run in locale. |
| `yarn lint` | `local` | This comand run in locale. |
| `yarn format` | `local` | This comand run in locale. |
| `yarn test` | `local` | This comand run in locale. |
| `yarn test:watch` | `local` | This comand run in locale. |
| `yarn dev:docker` | `docker` | This comand run in docker container. |
| `yarn test:docker` | `docker` | This comand run in docker container. |

#### Search all vehicles
get all vehicles and using query search and fields filter
```http
  GET /vehicles
```

| Query   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `string` | Type to search vehicle for all field values, this uses collage full text search. |
| `brand` | `string` | Type to search vehicle for brand field. |
| `year` | `string` | Type to search vehicle for year field. |
| `color` | `string` | Type to search vehicle for color field. |
| `isFavorite` | `string` | Type to search vehicle for isFavorite field. |
| `minPrice` | `string` | Type to search vehicle for field price >= minPrice. |
| `maxPrice` | `string` | Type to search vehicle for field price <= maxPrice. |


#### Add new Vehicle
create vehicle passing fields in body request
```http
  POST /vehicles
```

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **required**. Please enter a field name! |
| `brand` | `string` | **required**. Please enter a field brand! |
| `description` | `string` | Enter a field description! |
| `color` | `string` | **required**. Please enter a field color! |
| `year` | `string` | **required**. Please enter a field year! |
| `plate` | `string` | **required**. Please enter a field plate! |
| `price` | `string` | **required**. Please enter a field price! |
| `isFavorite` | `string` | Enter a field isFavorite! |

#### Update Vehicle by Id
update vehicle passing param id and fields in body request
```http
  PUT /vehicles
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **required**. Please enter a param id! |

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Enter a field name! |
| `brand` | `string` | Enter a field brand! |
| `description` | `string` | Enter a field description! |
| `color` | `string` | Enter a field color! |
| `year` | `string` | Enter a field year! |
| `plate` | `string` | Enter a field plate! |
| `price` | `string` | Enter a field price! |
| `isFavorite` | `string` | Enter a field isFavorite! |

#### Search Vehicle by Id
get unique vehicle passing id
```http
  GET /vehicles/:id
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **required**. Please enter a param id! |

#### Remove Vehicle by Id
remove unique vehicle passing id
```http
  DELETE /vehicles/:id
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **required**. Please enter a param id! |


#### Config
get all brands, years and colors usage in API
```http
  GET /config
```
