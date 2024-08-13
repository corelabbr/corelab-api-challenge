primeiramente inicializei o projeto
``` bash
npm init -y
```
então instalei as dependencias de produção e desenvolvimento:
```bash
pnpm add @prisma/client prisma cors dotenv express 
pnpm add -D @types/cors @types/express @types/jest @types/supertest jest jest-mock-extended superagent supertest ts-jest ts-node ts-node-dev typescript eslint prettier
```
após isso, rodei o comando para instalar o typescrit e o eslint, e instalei os plugins:

```bash
npx tsc --init
pnpm create @eslint/config@latest
pnpm add -D eslint-plugin-jest eslint-plugin-prettier eslint-plugin-promise  
```

configurando o prettier no arquivo **`package.json`**.

configurando o eslint no arquivo **`eslint.config.mjs`**.

criação do arquivo .editorconfig.

após isso criei o arquivo **`app.ts`**, **`server.ts`**, e **`config/route.ts`, e testei se estava funcionando tanto o express quanto o eslint e prettier.

após tudo funcionando perfeitamente, eu executei os comandos de setup do prisma:
```bash
npx prisma && npx prisma init
```
assim ele gera a pasta prisma, com o arquivo **`schema.prisma`**, e o arquivo **`.env`**.

depois configurei as variáveis DATABASE_URL, PORT, NODE_ENV, e APP_URL, e criei o arquivo **`env.ts`**.

agora com as variáveis setadas, criei o model Todo no arquivo schema.prisma e fiz a migração:
```bash
npx prisma migrate dev --name init && npx prisma generate
```
agora com tudo funcionando, criei as pastas **`api`**, **`api/controllers`**, **`api/errors`** **,`api/exceptions`**, **`api/types`**, **`middlewares`***, **`utils`**  e **`libs`**.

criei o arquivo **`libs/prisma.ts`** para utilizar o client do prisma.

após isso, criei as exceptions dentro de **`api/exceptions`** e o arquivo errorHandler em  **`middlewares/`**, e o arquivo cors em **`config`**.

configurei o express para usar o cors, e o errorHandler.

após isso, criei o type **`api/types/TodoUpsert.ts`**, os arquivos **`api/errors/index.ts`** e **`utils/validators.ts`** com as validações necessárias. 

depois disso criei o arquivo TodoController em **`api/controllers`** e as rotas em **`config/routes.ts`**

após alguns errors, funcionou tudo perfeitamente, então criei o 

após tudo funcionando perfeitamente, comecei a configurar o docker, criando o Dockerfile, docker-compose.yml, e o .dockerignore e as seeds, em **`prisma/`**.

após fazer a build utilizando o comando `docker-compose build`, iniciei os containers com **`docker-compose up`**.

então, entrando no terminal do container `app`. rodei as migrações no banco de dados do container do docker e rodei as seeds.
```bash
docker exec -it app /bin/sh
npx prisma migrate dev && npx prisma generate
pnpm seed
```

agora só faltou fazer configurar o jest e testar.

primeiro criei o arquivo **`jest.config.js`** para usar jest, e  **`skeleton.ts`** para mockar o client do prisma.

após isso, criei o arquivo **`todo.test.ts`** e testei o TodoController.

