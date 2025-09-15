O projeto consistiu no desenvolvimento de uma aplicação web para gestão de anotações (Todos), esse repositório tem como objetivo ser o beck-end para a interface web, utilizando Node.js como plataforma de backend e Sequelize como ORM para interagir com o banco de dados.
 Apesar de ter a flexibilidade de trocar frameworks ou dependências do projeto, optei por manter as configurações iniciais do package.json. Essa decisão me levou a explorar outras bibliotecas para o versionamento do banco de dados, optando pelo Sequelize devido à sua compatibilidade com o Node.js na versão ^16.

 Inicialmente, foram configurados containers Docker para executar tanto o serviço Node.js quanto o banco de dados, proporcionando um ambiente isolado e replicável para o desenvolvimento. Isso incluiu a criação da base de dados ao iniciar o container do banco de dados e a execução de migrações para configurar as tabelas necessárias.

 Posteriormente, a implementação das rotas da API para permitir a manipulação das anotações.

 Ressalto que a API ainda não está em um estado final. Embora as operações de CRUD estejam disponíveis, há espaço para melhorias.

