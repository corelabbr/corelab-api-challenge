<h1>Corelab Api Challenge</h1>
</hr>

Para esta api meu foco foi em utilizar tencnologias que já tive experiência. No começo, achei que teria tempo o suficiente para fazer uma api robusta, com cobertura de testes e inúmeras validações. Infelizmente, com o andamento, entendi que se eu quisesse entregar o projeto no prazo e com uma qualidade aceitável, teria de abrir mão de algumas funcionalidades.

Para estrutura da api utilizei algo que já tinha praticado antes, seguindo o SOLID aplicado a uma Arquitetura em camadas (Clean Architecture). As tecnologias utilizadas foram: Typescript, Node, mongodb, typeorm, tsyringe, lint, docker e prettier. Eu ia documentar com swagger mas não tive tempo.

Demorei cerca de 3 dias para completar todos os endpoints básicos da api, conseguindo testar e efetuar todas operações de CRUD. Como percebi que o front iria ser mais complicado, entendi que para priorizar a entrega escolhi encerrar meu backend neste ponto. Abaixo deixarei as rotas dos endpoints bem como o que poderia ser feito em uma atualização futura.


<hr></hr>


<h2>Rotas</h2>

<h3>/tasks</h3>

<h4>POST</h4>
createTask: http://localhost:5000/tasks

em caso de sucesso receberá um json contendo as informações da task cadastrada: 

```json
  {
    "_id": "66bbed3e9536dce15e230d61",
    "title": "asdasdasdsa",
    "taskContent": "Clique ou arraste o arquivo para esta área para fazer upload          ",
    "isFavorite": true
}
```

<h4>GET</h4>

getTasks: http://localhost:5000/tasks

em caso de sucesso receberá um array de json contendo todas tasks cadastradas: 
```json
  [
    {
        "_id": "66bbdb3b792e0f005c55a994",
        "title": "Título",
        "taskContent": "Clique ou arraste o arquivo para esta área para fazer upload",
        "isFavorite": true
    },
    {
    ...
    }
]
```

getTaskById: http://localhost:5000/tasks/:id

em caso de sucesso receberá um json contendo a task com o id mencionado: 

```json
{
    "_id": "66bbdb3b792e0f005c55a994",
    "title": "Título",
    "taskContent": "Clique ou arraste o arquivo para esta área para fazer upload",
    "isFavorite": true
}
```

<h4>PUT</h4>

updateTask:  http://localhost:5000/tasks/:id

Deverá enviar no body um json.

```json
{
    "title": "Título",
    "taskContent": "Clique ou arraste o arquivo para esta área para fazer upload",
    "isFavorite": false
}
```

em caso de sucesso receberá um json contendo as informações da task atualizada: 

```json
{
    "_id": "66bbdb3b792e0f005c55a994",
    "title": "Título",
    "taskContent": "Clique ou arraste o arquivo para esta área para fazer upload",
    "isFavorite": false
}
```

<h4>DELETE</h4>


deleteTask: http://localhost:5000/tasks/:id

em caso de sucesso receberá uma resposta assim: 

```string
Task deleted.
```


<hr></hr>


O que poderia ser feito futuramente?


Mais validações. Coloquei algumas validações com o zod mas acredito que não seja o suficiente.<br>

REFATORAÇÃO. Infelizmente não tive muito tempo de refatorar a api. Refatorei o que deu e acredito que foi tudo que pude,  há espaço para melhorias.<br>

Testes unitários, integração, e2e e testes automatizados. Não preciso comentar muito, a aplicação não conta com testes.<br>

<hr>

<h2>Manual de Instalação local</h2>

Para rodar o projeto localmente terá de ter instado <code>docker compose</code> para rodar a aplicação via docker ou ter em sua máquina as seguintes tecnologias:

Mongo community server e NodeJS v20.16.0 

Instalação docker:

Entre em uma pasta de sua escolha e rode o seguinte comando  <code>git clone https://github.com/rodi38/corelab-api-challenge.git</code>

Após clonar o projeto, mais uma vez entre no terminal, desta vez dentro da pasta do projeto e rode o seguinte comando: <code>npm install</code>

Em seguida, na raiz do projeto, crie um arquivo chamado <code>.env</code> e coloque os seguintes valores dentro: 

```.env
MONGO_URL = "mongodb://admin:123456@localhost:27017"
MONGO_DATABASE=SEU_BANCO
MONGO_USER=admin
```

Vá também no diretório <code> src/config/typeorm.ts</code> e substitua todo o conteúdo com a seguinte configuração:

```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadEnv } from './env.config';
import { Task } from 'modules/task/entities/Task.entity';

loadEnv();
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  database: process.env.MONGO_DATABASE,
  authSource: process.env.MONGO_USER,
  entities: [Task],
  logging: false,
  directConnection: true,
});
```
Na raiz do projeto, renomeie <code>docker-compose.example.yml</code> para <code>docker-compose.yml</code>

Em seguida basta rodar, respectivamente, os seguintes comandos no terminal: <code>docker-compose build --no-cache</code> e <code> docker-compose up -d</code>

Pronto. Seu backend estará rodando no endereço <code>http://localhost:5000/tasks</code>

Agora caso queira rodar sem o docker, basta seguir os primeiros passos, só terá de mudar a porta do mongo_url. terás de colocar a porta equivalente do seu banco local.


Aqui está o link para configurar o frontend: <code>https://github.com/rodi38/corelab-web-challenge/blob/main/PULL_REQUEST.md</code>
