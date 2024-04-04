01 abril 2024 17:06 - Conteinerização - Depois de ler e entender o desafio decidir começar pela api. Comecei
criando os containers que a mesma iria precisar, a princípio decidir criar dois containers, um deles para a
api (nodejs, adonis) e outro para o banco de dados (mysql).

Também decidir mudar o README para um rascunho do que será nosso passo a passo para construção da aplicação.

03 abril 2024 16:35 - TDD - Decidir começar a criar a estrutura base da api, a metodologia escolhida foi o TDD,
acredito que seja uma boa metodologia para se manter a cobertura de uma aplicação estável, assim como combiná-la
com outras metodologias.

Seguindo a folha de testes, já iniciei o processor de analisar quais dados irei persistir, alterar e disponibilzar

04 abril 2024 13:11 - Improviso - Me deparando com as versões recebidas da aplicação me deparo que o projeto não
possue a função de criação nativa de migrations, seeders e models, então, decido trazer uma abordagem um pouco
"rústica".

Com esta mesma abordagem, criei arquivos para conexão com o banco de dados e também criei os models de forma manual