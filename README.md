<a name="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">API</h3>
  <p align="center">
    ·
    <a href="https://github.com/itspedro/corelab-web-challenge/tree/dev">
      [FontEnd Repository]
    </a>
    ·
  </p>
</div>


<details open="open">
  <summary>Tabela de conteúdos</summary>
  <ol>
    <li>
      <a href="#executar-com-docker">Executar com docker</a>
    </li>
    <li>
      <a href="#executar-localmente">Executar Localmente</a>
    </li>
    <li><a href="#testes">Testes</a></li>
    <li><a href="#links-úteis">Links úteis</a></li>
  </ol>
</details>

## Executar com Docker

### Pré-requisitos

* [Docker](https://www.docker.com/)

### Instalação

1. Clone o repositório
    ```sh
    git clone https://github.com/itspedro/corelab-api-challenge.git -b dev
    cd corelab-api-challenge
    ```
2. Execute o docker-compose
    ```sh
    docker-compose up
    ```

## Executar Localmente

### Pré-requisitos

* [NodeJS](https://nodejs.org/en/)
* [NVM](https://github.com/nvm-sh/nvm)

Use o NVM para instalar o NodeJS

```sh
nvm install 16.15.0
nvm use 16.15.0
```

Instale o npm@^8.5.5

```sh
npm install -g npm@^8.5.5
```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/itspedro/corelab-api-challenge.git -b dev
   cd corelab-api-challenge
    ```
2. Instale os pacotes NPM
    ```sh
    npm install
    ```
3. Crie um cluster no [MongoDB Atlas](https://www.mongodb.com/docs/guides/atlas/cluster/) e crie um arquivo .env com base no arquivo .env.example
    ```sh
    cp .env.example .env
    ```
4. Execute o prisma generate
    ```sh
    npm run prisma:generate
    ```
5. Gere o build do projeto
    ```sh
    npm run tsc
    ```
6. Execute o projeto
    ```sh
    npm run start
    ```

## Testes

Para rodar os testes, execute o comando abaixo

```sh
npm run test
```

[De volta ao topo](#readme-top)

## Links úteis

* [Desenvolvimento do projeto](./PULL_REQUEST.md)
* [Documentação](./docs/routes.md)


---

<p align="center">
 &lt;/&gt; by Pedro Reis 👋 <a href="https://preis.tech/contato/">Contato!</a>
</p>

