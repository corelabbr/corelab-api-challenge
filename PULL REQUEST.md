
# Corelab API Challenge

A REST API for Corelab's Junior Developer Challenge



## Tech Stack

**Server:** Node, AdonisJS, Typescript

**DB:** Postgres

**API Archictecture:** Rest

**Patterns:** MVC

**Testing:** Japa

**CI/CD:** Github Actions

**Deploy:** Heroku



## Features

- Add, List, Update and Vehicles
- Add Favorite Vehicles
- Search Vehicles
- Filter Vehicles by: brand, color, price and year



## Installation

Install Corelab API Challenge with npm

 - Install docker
 - Install docker-compose

```bash
  git clone https://github.com/feitosadavi/corelab-api-challenge
  cd corelab-api-challenge
  npm install
  npm docker:migration-run
```


## Run

To run the project with Docker you need to follow the steps above:

```bash
  docker-compose up
```
    
## Running Tests with Docker

To run tests, run the following command

```bash
  npm run test
```

to watch code changes:

```bash
  npm run test:watch
```


## API Reference

### Get all vehicles (GET /vehicles)

```http
  curl -i -H 'Accept: application/json' http://localhost:3333/vehicles
```

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [{
        "id": 1,
        "name": "Sandero",
        "brand": "Sandero",
        "description": "Carro novo",
        "price": 120000,
        "plate": "ABC-1234",
        "color": "Vermelho",
        "year": "2022",
        "is_favorite": false,
        "created_at": 2022-07-11T02:29:33.900Z,
        "updated_at": 2022-07-11T02:29:33.900Z,
    }, {
        "id": 2,
        "name": "Model S",
        "brand": "Tesla",
        "description": "Carro muito bom",
        "plate": 3000000,
        "plate": "HHH-4567",
        "color": "Preto",
        "year": "2020",
        "is_favorite": false,
        "created_at": 2022-07-11T02:29:33.900Z,
        "updated_at": 2022-07-11T02:29:33.900Z,
    }]



### Get all vehicles given filters (GET /vehicles/filter/:color?/:year?/:price[min]?/:price[max]?/:brand?)

```http
  curl -i -H 'Accept: application/json' http://localhost:3333/vehicles?brand='Fiat'
```
    
#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [{
        "id": 1,
        "name": "Sandero",
        "brand": "Sandero",
        "description": "Carro novo",
        "price": 120000,
        "plate": "ABC-1234",
        "color": "Vermelho",
        "year": "2022",
        "is_favorite": false,
        "created_at": 2022-07-11T02:29:33.900Z,
        "updated_at": 2022-07-11T02:29:33.900Z,
    }]



### Add new Vehicles (POST /vehicles/store)

```http
  curl -i -H 'Accept: application/json' -d ${data} http://localhost:3333/vehicles/store'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Vehicle's name |
| `brand` | `string` | **Required**. Vehicle's brand |
| `description` | `string` | **Required**. Vehicle's description |
| `plate` | `string` | **Required**. Vehicle's plate |
| `price` | `float` | **Required**. Vehicle's price |
| `year` | `string` | **Required**. Vehicle's manufacturing year (between 1900 and current year) |
| `color` | `string` | **Required**. Vehicle's color |

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {id: 1}


### Update existent Vehicle (PUT /vehicles/:id/update)


```http
    curl -i -H 'Accept: application/json' -d ${data} http://localhost:3333/vehicles/1/update'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional**. Vehicle's name |
| `brand` | `string` | **Optional**. Vehicle's brand |
| `description` | `string` | **Optional**. Vehicle's description |
| `plate` | `string` | **Optional**. Vehicle's plate |
| `price` | `float` | **Optional**. Vehicle's price |
| `year` | `string` | **Optional**. Vehicle's manufacturing year (between 1900 and current year) |
| `color` | `string` | **Optional**. Vehicle's color |

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {id: 1}


### Toggle Vehicle's isFavourite field (PUT /vehicles/:id/add-favorite)

```http
    curl -i -H 'Accept: application/json' -d {is_favorite: true} http://localhost:3333/vehicles/1/add-favorite'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `is_favorite` | `boolean` | **Required**. |

#### Response

    HTTP/1.1 204 NO CONTENT
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

### Delete vehicle (DELETE /vehicles/:id/delete)

```http
    curl -i -H 'Accept: application/json' -d {is_favorite: true} http://localhost:3333/vehicles/1/delete'
```

#### Response

    HTTP/1.1 204 NO CONTENT
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2
## Final Considerations

It was amazing to work with this project. I was able to learn new technologies like Adonis and Postgres and work with patterns I wasn't very used to. Thanks for the opportunity and see you soon!

