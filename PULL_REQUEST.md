## Para rodar:

### Setup do banco de dados
1. Crie um arquivo .env na pasta root, e copie o conteúdo do arquivo .env.example

2. Inicie uma imagem Postgresql com o comando: `` $ docker compose up -d ``

3. Crie e faça o deploy das migrations do banco com os comandos:
``$ npx prisma migrate dev``
``$ npx prisma generate``


### Iniciar aplicação
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes e2e

Os testes foram desenvolvidos de forma a simularem as requisições de maneira mais real possível. Você pode resetar o banco a cada teste manualmente ou criar uma linha como esta:
`` "setupFilesAfterEnv": ["../test/setup.e2e.ts"] ``
No arquivo jest-e2e.json, de forma que o arquivo setup resete o banco automaticamente.

```bash
# e2e tests
$ npm run test:e2e
```

## Tecnologias utilizadas:

- Nest, como framework principal,
- Zod, como validador de requisições
- Prisma, como ORM

Junto de caracteristicas principais da arquitetura CLEAN


