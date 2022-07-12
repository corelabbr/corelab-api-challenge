# API - Vehicles Ads

Esta é uma RESTful API que permite fazer um CRUD de veículos.

## **Endpoints**

### **Cadastrar um veículo**

#### `POST` `/newvh`

Essa é a rota que será utilizada para cadastrar um novo veículo no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   marca
    -   cor
    -   ano
    -   placa

#### **Exemplo de requisição**

```javascript
// POST /newvh
{
      "name": "Sandero",
      "brand": "Renault",
      "color": "Vermelho",
      "year": 2016,
      "plate": "PZ1020"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   "mensagem": "Veículo cadastrado com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não foi possivel cadastrar o veículo."
}
```

### **Atualizar um veículo**

#### `PATCH` `/updateVehicle/:id`

Essa é a rota que será utilizada para atualizar um veículo no sistema.

-   **Requisição**  
    Parâmetro de rota será o id do veículo à ser atualizado.
    O corpo (body) deverá possuir um objeto, sendo necessária ao menos uma para atualização com as seguintes propriedades:

    -   nome
    -   marca
    -   cor
    -   ano
    -   placa
    -   preço
    -   descrição

#### **Exemplo de requisição**

```javascript
// POST /newvh
{
      "name": "Sandero",
      "brand": "Renault",
      "color": "Vermelho",
      "year": 2016,
      "plate": "PZ1020",
      "price": 201545,
      "description": "Único dono, usado por 6 anos."
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   "mensagem": "Veículo atualizado com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não foi possivel atualizar o veículo."
}
```

### **Deletar um veículo**

#### `DELETE` `/deleteVehicle/:id`

Essa é a rota que será utilizada para deletar um veículo no sistema.

-   **Requisição**  
    O parâmetro de rota será o id do Veiculo.  
    

#### **Exemplo de requisição**

```javascript
// DELETE /deleteVehicle/:id

```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   "mensagem": "Veículo deletado com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não foi possivel deletar o veículo"
}
```

### ** Pesquisar todos os veículos *

#### `GET` `/vhs/:id`

Essa é a rota que será utilizada para retornar o veículo de ID cadastrado.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Sem

#### **Exemplo de requisição**

```javascript
// GET `/vhs`

```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"name": "Sandero",
		"brand": "Renault",
		"color": "Vermelho",
		"year": 2016,
		"plate": "PZ1020",
		"price": null,
		"favorite": false,
		"createdat": null
	},
	{
		"id": 2,
		"name": "Sandero",
		"brand": "Renault",
		"color": "Vermelho",
		"year": 2018,
		"plate": "PZ1021",
		"price": null,
		"favorite": false,
		"createdat": null
	},
	{
		"id": 3,
		"name": "Sandero",
		"brand": "BMW",
		"color": "Prata",
		"year": 3000,
		"plate": "PMG5586",
		"price": null,
		"favorite": false,
		"createdat": null
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não há nenhum veículo cadastrado."
}
```
### ** Pesquisar um veículo**

#### `GET` `/vhs`

Essa é a rota que será utilizada para retornart todos os veículos cadastrados no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Sem

#### **Exemplo de requisição**

```javascript
// GET `/vhs`

```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"name": "Sandero",
		"brand": "Renault",
		"color": "Vermelho",
		"year": 2016,
		"plate": "PZ1020",
		"price": null,
		"favorite": false,
		"createdat": null
	},
	{
		"id": 2,
		"name": "Sandero",
		"brand": "Renault",
		"color": "Vermelho",
		"year": 2018,
		"plate": "PZ1021",
		"price": null,
		"favorite": false,
		"createdat": null
	},
	{
		"id": 3,
		"name": "Sandero",
		"brand": "BMW",
		"color": "Prata",
		"year": 3000,
		"plate": "PMG5586",
		"price": null,
		"favorite": false,
		"createdat": null
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não há nenhum veículo cadastrado."
}
```


