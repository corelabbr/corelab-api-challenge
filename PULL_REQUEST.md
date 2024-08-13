Corelab Api Challenge.

Para esta api meu foco foi em utilizar tencnologias que já tive experiência. No começo, achei que teria tempo o suficiente para fazer uma api robusta, com cobertura de testes e inúmeras validações. Infelizmente, com o andamento, entendi que se eu quisesse entregar o projeto no prazo e com uma qualidade aceitável, teria de abrir mão de algumas funcionalidades.

Para estrutura da api utilizei algo que já tinha praticado antes, seguind o SOLID aplicado a uma Arquitetura em camadas (Clean Architecture). Tecnologias utilizadas foram: Typescript, Node, mongodb, typeorm, tsyringe, lint, docker e prettier. Eu ia documentar com swagger mas não tive tempo.

Demorei cerca de 3 dias para completar todos os endpoints básicos da api, conseguindo testar e efetuar todas operações de CRUD. Como percebi que o front iria ser mais complicado, entendi que para priorizar a entrega escolhi encerrar meu backend neste ponto. Abaixo deixarei as rotas dos endpoints bem como o que poderia ser feito em uma atualização futura.

Deixarei um manual de instalação local em um arquivo chamado MANUAL_INSTALAÇÃO.md

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

Nesta api comecei implementando docker e cheguei a utilizar boa parte do desenvolvimento front-end com ela já pronta, porém, acredito que isso possa ser melhorado.<br>

Mais validações. Coloquei algumas validações com o zod mas acredito que não seja o suficiente.<br>

REFATORAÇÃO. Infelizmente não tive muito tempo de refatorar a api. Refatorei o que deu e acredito que foi tudo que pude, porém, há espaço para melhorias.<br>

Testes unitários, integração, e2e e testes automatizados. Não preciso comentar muito, a aplicação não conta com testes. Não houve tempo.<br>




