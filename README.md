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

## Como executar

### Pré-requisitos

* [NodeJS](https://nodejs.org/en/)
* [NVM](https://github.com/nvm-sh/nvm)

Use o NVM para instalar o NodeJS

```sh
nvm install node@^16.15.0
nvm use node@^16.15.0
```

Instale o npm@^8.5.5

```sh
npm install -g npm@^8.5.5
```

Crie um cluster no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e crie um arquivo .env com base no arquivo .env.example

```sh
cp .env.example .env
```

### Instalação

1. Clone o repositório
   ```sh
   git clone
    ```
2. Instale os pacotes NPM
    ```sh
    npm install
    ```
3. Execute o prisma generate
    ```sh
    npm run prisma:generate
    ```
4. Inicie o servidor
    ```sh
    npm run dev
    ```

## Testes

Para rodar os testes, execute o comando abaixo

```sh
npm run test
```

[Documentação](./docs/routes.md)
```


---

<p align="center">
 &lt;/&gt; by Pedro Reis 👋 <a href="https://preis.tech/contato/">Contato!</a>
</p>

