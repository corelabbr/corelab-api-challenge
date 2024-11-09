# Corelab Api Challenge

## Sobre o projeto
- Projeto para o desafio da Corelab: API para um site de gestão de notas.

## Instrução de uso
1. Faça um clone desse repositório usando o comando: `https://github.com/RudsonSantana/corelab-api-challenge.git` no seu terminal e dentro da pasta que deseja clonar o repositório. Pode utilizar o terminal  [Git](https://git-scm.com/downloads);

2. Entre no diretório do projeto usando `cd corelab-api-challenge`;

3. Abra o projeto no seu editor de código preferido. Se for utilizar o [VS Code](https://code.visualstudio.com/download) e estiver usando Git use o código `code .`;

4. Abra o terminal do seu editor e use o comando `npm i` para instalar todos os pacotes;

5. Ainda utilizando o terminal do seu editor:

   5.1. Crie o banco de dados com o comando `npm run sequelize:db`;

   5.2. Rode as migrations para criar as tabelas com o comando `npm run sequelize:migrate`;

   5.3. Para rodar os testes:

     - Unitários: `npm run test:unit`;

     - De integração `npm run test:integration`.

    5.4. Build o projeto usando `npm run build`;

6. Abra o MySQL do seu computador, coloque o seu login e senha e verifique se o banco de dados foi criado;

7. Se o banco de dados estiver criado inicialize o projeto usando `npm run start`, caso contrário refaça os passos anteriores;

   - Para ambiente de desenvolvimento utilize `npm run dev`.

8. No seu navegador acesse o link `http://localhost:porta` substitua a palavra `porta` pelo número da porta que você está usando;

9. Agora teste as rotas na documentação. 

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/docs/v6/)
- [Express](https://expressjs.com/pt-br/4x/api.html)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/docs/)
- [MySQL](https://dev.mysql.com/doc/)

## Autor

<table>
<td>
  <div align="center">
    <img align="center" alt="Rudson Santana" height="150" src="https://avatars.githubusercontent.com/u/116411313?v=4"> 
  </div>
  <h3 align="center"><a href="https://github.com/RudsonSantana">Rudson Santana</a></h3>
  <div>
  <a href = "mailto:rudsonsanttana@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/rudson-santana/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
  </div>
</td>
</table>

