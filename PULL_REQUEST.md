# Sobre o projeto

O projeto do back-end foi construído em NestJS + Typescript.

Para iniciar a configuração inicial do sistema, clone o repositório localmente, e depois instale as dependências através do comando `npm i`.

Após isso, copie os conteúdos do arquivo `./.env.example` em um novo arquivo chamado `.env` na root do projeto. Após isso, é preciso preencher as variáveis com as informações de seu banco de dados. A aplicação possui suporte para Postgres e MySQL. Preencha do seguinte modo, substituindo os campos dummy com os dados do seu banco de dados:

![image](https://github.com/user-attachments/assets/0ed1ce75-457e-4fa4-9d50-de513e4169a1)

Após isso, a aplicação necessitará da criação de um banco de dados para funcionar. Já há um script pré-montado para criar o banco no `package.json` da aplicação. Para rodá-lo, rode o comando `npm run db:create`.

Após isso, a aplicação está pronta para ser rodada. Rode o comando `npm run start:dev`, e ela irá começar a compilar o Typescript e subir a API na porta inserida nas variáveis de ambiente.

### Documentação da API

A API possui Swagger instalado para a documentação de seus endpoints. Acesse o caminho `localhost:{API_PORT}/swagger`, e a documentação da API se tornará visível, com os endpoints mostrando seus possíveis retornos para as requisições:

![image](https://github.com/user-attachments/assets/6bb915d8-2e99-433d-a3ba-01fb7095f59f)


OBS: Devido a uma série de problemas que decorreram nessa semana, não foi possível efetuar a entrega do front-end em conjunto com o back.