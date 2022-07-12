# PullRequest.MD

## introdução

Olá,
Primeiramente obrigado pela oportunidade.
Eu tive pouco tempo durante a semana e só pude realmente me dedicar ao desafio a partir do Sábado (9/07) como o prazo termina Hoje (11/07) dei o meu melhor para demonstrar minhas habilidades.

Não tinha muita experiência com Adonis então apliquei com base na documentação do [Adonis]([https://docs.adonisjs.com](https://docs.adonisjs.com/)) e na aula do Youtube no canal [Rocketseat](https://www.youtube.com/watch?v=uVR8lTlBoag&ab_channel=Rocketseat)

As primeiras horas do projeto comecei tentando arrumar alguns erros do ESlint
como não tenho muita familiaridade com o mesmo procurei as soluções dos erros que fui encontrando no Google.

Depois  iniciei criando as rotas do CRUD do `app\Controllers\VehiclesController.ts` e fui testando usando o [Insomnia]([https://insomnia.rest](https://insomnia.rest/download))
em seguida configurei o Banco de dados SQLite usando a biblioteca `@adonisjs/lucid`
Criei a migration e o model `app\Models\Vehicle.ts` com as colunas que encontrei como retorno da rota Index do `app\Controllers\VehiclesController.ts`

acabei criando algumas colunas erradas e tive que recriar na migration e rodar novamente 

voltei no `app\Controllers\VehiclesController.ts` adicionei as funcionalidades corretas do CRUD para cada action (fazer o index retornar a lista de veículos, criar um novo veiculo, etc...)

depois criei a rota e o controller `app\Controllers\FavoritesController.ts` para favoritar os veículos
basicamente recebendo um parâmetro do `isFavorite` como `true` ou `false`.

Por fim criei a rota de busca `app\Controllers\SearchController.ts` para filtrar os veículos
para fazer essa funcionalidade tive que procurar na documentação como fazer buscas com o `AdonisJs` e encontrei os metodos `where` `orWhere` e usei para que a busca funcionasse em todos os atributos dos veículos. Havia tentando com o metodo `orWhereHas` mas não consegui fazer funcionar 

## Funcionalidades faltando 
- Adaptar a busca com o filtro detalhado
- Testes automatizados 

## Como rodar o projeto 
- Instalar `Node: ^16.15.0` e `NPM: ^8.5.5`
- renomear o arquivo `.env.exemple` para `.env`
- Rodar o comando `npm install` para instalar as dependências 
- Rodar o comando `npm ace migration:run` para criar as migrations
- Rodar o camando `npm run dev` para iniciar o Servidor

## Rotas
- Post `http://localhost:3333/vehicles`

Exemplo de parametro:
```json
  {
  "name": "Gol",
  "description": "This is a description of first vehicle",
  "plate": "DDT-5005",
  "year": 2018,
  "color": "#ff00ff",
  "price": 22000,
  }
```
Exemplo de resposta:
```json
{
  "name": "Gol",
  "description": "This is a description of first vehicle",
  "plate": "DDT-5005",
  "year": 2018,
  "color": "#ff00ff",
  "price": 22000,
  "created_at": "2022-07-11T22:45:01.283-03:00",
  "updated_at": "2022-07-11T22:45:01.283-03:00",
    "id": 1
  }
```


- Put `http://localhost:3333/vehicles/:id` 

Exemplo de parametro:
```json
{
	
	"year":2004,
	"price":15000,
	"color": "#000080",
	"plate":"abc-123"
}
```
Exemplo de resposta:
```json
{
	
	"name": "Gol",
	"description": "This is a description of first vehicle",
	"plate": "abc-123",
	"color": "#000080",
	"year": 2004,
	"price": 15000,
	"created_at": "2022-07-11T22:44:54.000-03:00",
	"updated_at": "2022-07-11T23:09:06.234-03:00"
  "id": 1,
}
```



- Delete `http://localhost:3333/vehicles/:id`

Exemplo de resposta:
```json
{}
```


- Get `http://localhost:3333/vehicles/:id`

Exemplo de resposta: 
```json
{
  "name": "Gol",
  "description": "This is a description of first vehicle",
  "plate": "DDT-5005",
  "year": 2018,
  "color": "#ff00ff",
  "price": 22000,
  "created_at": "2022-07-11T22:45:01.283-03:00",
  "updated_at": "2022-07-11T22:45:01.283-03:00",
  "id": 1
}
```

- Get `http://localhost:3333/vehicles/`

Exemplo de resposta: 
```json
[
	{
		"id": 3,
		"name": "Renault Kwid",
		"description": "Meu novo carro",
		"plate": "DDT-2077",
		"color": "#808080",
		"is_favorite": 0,
		"year": 2008,
		"price": 22000,
		"created_at": "2022-07-12T00:33:13.000-03:00",
		"updated_at": "2022-07-12T00:33:13.000-03:00"
	},
	{
		"id": 2,
		"name": "renault sandero",
		"description": "Meu carro favorito",
		"plate": "DDT-5005",
		"color": "#ff00ff",
		"is_favorite": 0,
		"year": 2008,
		"price": 22000,
		"created_at": "2022-07-12T00:31:47.000-03:00",
		"updated_at": "2022-07-12T00:31:47.000-03:00"
	},
	{
		"id": 1,
		"name": "Gol",
		"description": "This is a description of first vehicle",
		"plate": "DDT-5005",
		"color": "#ff00ff",
		"is_favorite": 0,
		"year": 2018,
		"price": 22000,
		"created_at": "2022-07-11T22:45:01.000-03:00",
		"updated_at": "2022-07-11T22:45:01.000-03:00"
	}
]
```

- Put `http://localhost:3333/favorite/:id`

Exemplo de resposta: 
```json
{
  "name": "Gol",
  "description": "This is a description of first vehicle",
  "plate": "DDT-5005",
  "year": 2018,
  "color": "#ff00ff",
  "price": 22000,
  "is_favorite" true
  "created_at": "2022-07-11T22:45:01.283-03:00",
  "updated_at": "2022-07-11T22:45:01.283-03:00",
  "id": 1
}
```

- get `http://localhost:3333/search?text=` 

Exemplo de resposta:
```json
[
	{
    "id": 3,
    "name": "renault sandero",
    "description": "Meu carro favorito",
    "plate": "DDT-5005",
    "color": "#ff00ff",
    "is_favorite": 0,
    "year": 2008,
    "price": 22000,
    "created_at": "2022-07-12T00:31:47.000-03:00",
    "updated_at": "2022-07-12T00:31:47.000-03:00"
	},
	{
		"id": 2,
		"name": "Renault Kwid",
		"description": "Meu novo carro",
		"plate": "DDT-2077",
		"color": "#808080",
		"is_favorite": 0,
		"year": 2008,
		"price": 22000,
		"created_at": "2022-07-12T00:33:13.000-03:00",
		"updated_at": "2022-07-12T00:33:13.000-03:00"
	}
]
```