## Endpoints

---

### GET `/`
**Descrição:**  
Página inicial ou rota de boas-vindas da API.

**Resposta de Sucesso:**
- **Código:** 200 OK  
- **Corpo:**  
```json
{
  "message": "Welcome to JubileuTaskListAPI"
}
```

### POST `/register`
**Descrição:**
Registra um novo usuário.

```json
{
  "nome": "lol",
  "email": "lol@hotmail.com",
  "senha": "123",
  "confirmSenha": "123"
}
```

```json
Status: 201 Created Size: 248 Bytes Time: 166 ms
```

### Resposta de Sucesso:

**Código:** 201 Created

**Corpo:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "nome": "lol",
    "email": "lol@hotmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDcwNDg1ODksImV4cCI6MTc0NzA3MDE4OX0.oKgusVkihj5ZkHxlpjX2haEWbNrQAS9Iw7Lv9BA0o3k"
}
```

### POST `/login`
**Descrição:**
Autentica um usuário e retorna um token JWT.

**Body (JSON):**
```json
{
  "email": "lol@hotmail.com",
  "senha": "123"
}
```
```json
Status: 200 OK Size: 238 Bytes Time: 69 ms
```
### Resposta de Sucesso:

**Código:** 200 OK

**Corpo:**

```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "nome": "lol",
    "email": "lol@hotmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDcwNDg2MjYsImV4cCI6MTc0NzA3MDIyNn0.2eZDHFRoIpltyLtmTJJWXGHsGO-PPGla6pW5HX9RSo4"
}
```

### POST `/tasks`
**Descrição:**
Cria uma nova tarefa. Requer autenticação JWT.

**Headers:**

```makefile
Authorization: Bearer JWT_TOKEN
```
```json
{
  "titulo": "subir commit para garantir",
  "descricao": "consegui terminar a dockerização da api",
  "dataPrevista": "2025-05-12",
  "prioridade": "MEDIA",
  "status": true,
  "cor": "bg-back"
}
```
```json

Status: 201 Created Size: 280 Bytes Time: 17 ms
```
## Resposta de Sucesso:

- **Código:** 201 Created

- **Corpo:**
```json
{
  "message": "Task successfully created!",
  "task": {
    "id": 2,
    "titulo": "subir commit para garantir",
    "descricao": "consegui terminar a dockerização da api",
    "dataPrevista": "2025-05-12T14:00:00.000Z",
    "prioridade": "MEDIA",
    "status": true,
    "cor": "bg-back",
    "createdAt": "2025-05-12T11:18:11.906Z",
    "usuarioId": 1
  }
}
```
### GET `/tasks`
**Descrição:**
Obtem as tarefas listadas do usuario logado. Requer autenticação JWT.

**Headers:**

```makefile
Authorization: Bearer JWT_TOKEN
```

```json
Status: 200 OK Size: 459 Bytes Time: 9 ms
```
## Resposta de Sucesso:

- **Código:** 200 Successfull

- **Corpo:**
```json
[
  {
    "id": 2,
    "titulo": "subir commit para garantir",
    "descricao": "consegui terminar a dockerização da api",
    "dataPrevista": "2025-05-12T14:00:00.000Z",
    "prioridade": "MEDIA",
    "status": true,
    "cor": "bg-back",
    "createdAt": "2025-05-12T11:18:11.906Z",
    "usuarioId": 1
  },
  {
    "id": 1,
    "titulo": "correr no parque",
    "descricao": "ir correr e caminhar no parque hoje a tarde",
    "dataPrevista": "2025-05-06T14:00:00.000Z",
    "prioridade": "MEDIA",
    "status": true,
    "cor": "bg-back",
    "createdAt": "2025-05-12T11:17:35.829Z",
    "usuarioId": 1
  }
]
```

### PUT `/task/:id`
**Descrição:**
Atualiza a tarefa que foi passada por id. Requer autenticação JWT.
**Headers:**

```makefile
Authorization: Bearer JWT_TOKEN
```

```ts
{
  "status": false
}
```

```json
Status: 200 OK Size: 225 Bytes Time: 10 ms
```
## Resposta de Sucesso:

- **Código:** 200 Successfull

- **Corpo:**
```json
{
  "id": 1,
  "titulo": "correr no parque",
  "descricao": "ir correr e caminhar no parque hoje a tarde",
  "dataPrevista": "2025-05-06T14:00:00.000Z",
  "prioridade": "MEDIA",
  "status": false,
  "cor": "bg-back",
  "createdAt": "2025-05-12T11:17:35.829Z",
  "usuarioId": 1
}
```

### DELETE `/task/:id`
**Descrição:**
Deleta a tarefa que foi passada por id. Requer autenticação JWT.
**Headers:**

```makefile
Authorization: Bearer JWT_TOKEN
```

```json
Status: 200 OK Size: 225 Bytes Time: 10 ms
```
- **Corpo:**
```json
{
  "success": "Task deleted"
}
```


### POST `/forgot-password`
**Descrição:**
Recuperação de senha

```ts
{
  "email": lol@gmail.com
}
```
```json
Status: 200 OK Size: 28 Bytes Time: 10.99 s
```
- **Corpo:**
```json
{
  "message": "E-mail enviado"
}
```

- **Email:**
```bash
Olá,

Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:

Redefinir senha

Se você não solicitou essa alteração, ignore este e-mail.
```

### POST `/reset-password`
**Descrição:**
Redefinição de senha

```ts
{
  "token": "c6a4855befbd0f094a1f9c4f179c700c90cdfc1f73589364b53c099a25a46766",
  "newPassword": "hahaha"
}
```
```json
Status: 200 OK Size: 42 Bytes Time: 7.63 s
```

- **Corpo:**
```json
{
  "message": "Senha redefinida com sucesso"
}
```





## Autenticação
Algumas rotas exigem autenticação JWT. Envie o token no cabeçalho `Authorization`:

```makefile
Authorization: Bearer JWT_TOKEN
```
## Erros Comuns
- 401 Unauthorized: Token inválido ou ausente

- 400 Bad Request: Campos obrigatórios ausentes ou inválidos

- 500 Internal Server Error: Erro interno da aplicação

## Visão geral de tempo de resposta Jacob Nielsen, Google Web Vitals, Experiências e benchmarks em APIs REST

| Tempo de resposta | Classificação Geral              |
|-------------------|----------------------------------|
| 0–100ms           | Excelente (quase instantâneo)    |
| 100–300ms         | Muito bom / aceitável            |
| 300–500ms         | Bom, mas pode melhorar           |
| 500ms–1s          | Limite tolerável                 |
| > 1s              | Pode causar frustração           |