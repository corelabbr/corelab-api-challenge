# /v1/task

## Methods

### GET

- URL: `/`
- Descrição: Retorna todas as tasks cadastradas
- Response:
  - Status: 200
  - Body: 
  ```json	
  {
    "msg": "Tasks found successfully",
    "data": [
      {
        "id": "65a981fe6703e41b704efdc7",
        "title": "Titulo",
        "body": "corpo",
        "color": "#fff",
        "favorited": true
      },
      // tasks...
    ]
  }
  ```

- URL: `/:id`
- Descrição: Retorna uma task específica
- Response:
  - Status: 200
  - Body: 
  ```json	
  {
    "msg": "Task found successfully",
    "data": {
      "title": "Titulo",
      "body": "corpo",
      "color": "#fff",
      "favorited": true
    }
  }
  ```

### POST

- URL: `/`
- Descrição: Cria uma nova task
- type: application/json
- Body:
  ```json	
  {
    "title": "Titulo",
    "body": "corpo",
    "color": "#fff",
    "favorited": true
  }
  ```
- Response:
  - Status: 200
  - Body: 
  ```json	
  {
    "msg": "Task created successfully",
    "data": {
      "id": "65ab9d7241465e70ade3b9cb",
      "title": "Titulo",
      "body": "corpo",
      "color": "#fff",
      "favorited": true
    }
  }
  ```

### PUT

- URL: `/`
- Descrição: Atualiza uma task
- type: application/json
- Body:
  ```json	
  {
    "id": "65ab9d7241465e70ade3b9cb",
    "title": "Titulo novo",
    "body": "corpo novo",
    "color": "#000",
    "favorited": false
  }
  ```
- Response:
  - Status: 200
  - Body: 
  ```json	
  {
    "msg": "Task updated successfully",
    "data": {
      "id": "65ab9d7241465e70ade3b9cb",
      "title": "Titulo novo",
      "body": "corpo novo",
      "color": "#000",
      "favorited": false
    }
  }
  ```

### DELETE

- URL: `/:id`
- Descrição: Deleta uma task
- Response:
  - Status: 200
  - Body: 
  ```json	
  {
    "msg": "Task deleted successfully"
  }
  ```

