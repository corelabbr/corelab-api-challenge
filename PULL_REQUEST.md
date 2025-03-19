# NestJS – BACK-END

## Recursos integrados com o front-end

### Gerenciamento de Tarefas

- Criação de tarefas;
- Marcação de tarefas como favoritas;
- Atribuição de cores às tarefas;
- Exclusão de tarefas;
- Atualização de tarefas;
- Pesquisa de tarefas por cor e título;
- Responsividade para adaptação a telas pequenas;
- As tarefas favoritas são exibidas no topo, conforme o mockup;
- Botão de logout para desautenticar (vermelho como normalmente é usado) e retornar à página de login.

## Autenticação

- Cadastro (username, password e confirmar senha) e validação de usuários com parâmetros definidos;
- Autenticação com username e senha. Além de validação de usuários com parâmetros definidos;
- Páginas de login e registro de usuários responsivas e atraentes.
- O usuário tem um perfil e ele pode atualizar os dados. Além de excluir a conta dele.
- Aparecerá um avatar no dashboard onde ficam as tarefas para o perfil do usuário, onde ele consegue visualizar os dados e sair do sistema.
- Foi criado um User Slice que integra com o Redux para gerenciar os dados do perfil do usuário, como o nome de usuário e e-mail. O estado é compartilhado com cabeçalho e com a página que exibe estes detalhes.

## Animação

Quando necessário terá animações de carregamento em botões (que são desabilitados quando há requisição) e páginas.
Feito com CSS e sem frameworks de animação.

## Testes

- Testes unitários foram implementados para verificar a aplicação e com isso obter um coverage de testes;
- Integração com Vitest.

## Docker

- Suporte ao uso de Docker tanto para o back-end quanto para o front-end.

## CI

- Testes de CI são realizados com os recursos existentes.

## NestJS

### Sobre o NestJS, suas características e vantagens

O NestJS é um framework de desenvolvimento de aplicativos Node.js criado em 2017 por Kamil Mysliwiec, um desenvolvedor polonês. Ele foi inspirado no Angular e utiliza o TypeScript como linguagem principal, o que é considerado uma das principais vantagens. O NestJS foi projetado para criar aplicativos escaláveis, eficientes e modularizados, seguindo os princípios de arquitetura orientada a serviços (SOA), injeção de dependência e programação orientada a aspectos (POA).

Uma característica relevante do NestJS é que ele é amplamente adotado por várias empresas para projetos grandes, devido aos seus princípios.

As principais vantagens do NestJS incluem a arquitetura modular e baseada em componentes, o suporte nativo para criação de APIs RESTful e aplicativos em tempo real usando WebSockets. Além disso, o NestJS se integra facilmente com bibliotecas populares, como TypeORM e Sequelize para acesso a bancos de dados, Fastify ou Express para a camada de transporte HTTP, e Socket.io para comunicação em tempo real. O uso do TypeScript no NestJS também oferece benefícios significativos, como a detecção de erros em tempo de compilação e a melhoria na manutenção do código.

Outros conceitos importantes no NestJS incluem:

- DTO (Data Transfer Object): Usado para definir a estrutura dos dados que serão enviados ou recebidos nas requisições HTTP, principalmente nos controladores, para validar e transformar os dados antes de serem processados pelos serviços.

- Schema: Usado principalmente em conjunto com bibliotecas de Object-Relational Mapping (ORM), como TypeORM, para definir a estrutura das tabelas e entidades do banco de dados e validar/transformar dados recebidos nas requisições HTTP.

- Serviços: Responsáveis por realizar operações de consulta, criação, atualização e exclusão dos dados em um banco de dados ou em uma API. São injetados nos controladores e outros serviços por meio da inversão de controle e injeção de dependências.

- Módulo: Unidades organizacionais que agrupam controladores, serviços, provedores e outros componentes relacionados, facilitando a organização, manutenção, testabilidade e escalabilidade do código.

- Decorators: Utilizados no controller da API para agilizar o desenvolvimento, como @Res para resposta, @Param para parâmetros na URL e @Body para receber o DTO. Decorators são anotações que podem ser adicionadas ao código TypeScript para fornecer metadados e configurar o comportamento de várias partes da aplicação.

No geral, o NestJS é uma escolha sólida para o desenvolvimento de aplicativos Node.js, especialmente para projetos complexos e escaláveis.

## TypeORM e PostgreSQL

ORM (Object-Relational Mapping):

- Definição: ORM é uma técnica que permite a você interagir com um banco de dados relacional usando um modelo orientado a objetos. O TypeORM faz a ponte entre o banco de dados e seu código TypeScript/JavaScript.
Objetivo: Facilitar o trabalho com banco de dados, mapeando tabelas para classes e colunas para propriedades de classe.

Entidades:

- Entidades são classes que representam tabelas no banco de dados. Cada instância de uma entidade corresponde a uma linha na tabela.
Exemplo: Uma classe User pode representar uma tabela users.

Repositórios:

- Repositórios são responsáveis por gerenciar as operações de CRUD (Create, Read, Update, Delete) para uma entidade. Eles fornecem métodos para realizar operações no banco de dados.
Exemplo: O userRepository gerencia a entidade User.

Query Builder:

- O Query Builder permite a construção de consultas SQL de maneira programática e flexível. É útil para consultas mais complexas que não são facilmente realizadas com os métodos padrão dos repositórios.
Exemplo: Criar consultas dinâmicas e personalizadas.
Migrações:

- Migrações são uma maneira de aplicar mudanças no esquema do banco de dados de forma controlada. Permitem adicionar, remover ou modificar tabelas e colunas.
Exemplo: Adicionar uma nova coluna à tabela users.
Data Source:

- O DataSource é a configuração principal do TypeORM que define como conectar ao banco de dados, quais entidades usar e outras opções de configuração.
PostgreSQL.

Banco de Dados Relacional:

- PostgreSQL é um sistema de gerenciamento de banco de dados relacional (RDBMS). Ele armazena dados em tabelas e usa SQL (Structured Query Language) para manipulação de dados.
Objetivo: Gerenciar e consultar dados de maneira estruturada.
SQL (Structured Query Language):

- SQL é a linguagem usada para comunicar com bancos de dados relacionais. Permite executar consultas, inserir, atualizar e excluir dados.
Exemplo: SELECT * FROM users WHERE id = 1;

- Schemas são formas de organizar tabelas e outros objetos dentro de um banco de dados. Eles ajudam a dividir dados em diferentes grupos.
Exemplo: Um schema public que contém todas as tabelas padrão.
Transações:

- Transações são um conjunto de operações que são executadas como uma única unidade de trabalho. Se uma operação falhar, todas as mudanças podem ser revertidas.
Exemplo: Inserir dados em várias tabelas e garantir que todas as operações sejam bem-sucedidas ou revertidas em caso de erro.
Índices:

- Índices são estruturas de dados que melhoram a velocidade das operações de busca em tabelas. Eles são criados em colunas para acelerar as consultas.
Exemplo: Índice na coluna email da tabela users para consultas rápidas por email.
Funções e Procedimentos Armazenados:

- Funções e procedimentos armazenados são blocos de código SQL que podem ser executados no banco de dados. Eles ajudam a encapsular lógica e reutilizar código.
Exemplo: Uma função que calcula o total de vendas para um determinado período.
Interação entre TypeORM e PostgreSQL

- Mapping: TypeORM mapeia classes TypeScript/JavaScript para tabelas PostgreSQL. Isso significa que você pode interagir com o banco de dados usando objetos e métodos de classe, sem escrever SQL diretamente.

- Sync e Migrações: TypeORM pode sincronizar automaticamente o esquema do banco de dados com suas entidades, ou você pode usar migrações para gerenciar mudanças de forma mais controlada.
Consultas: Você pode usar o Query Builder do TypeORM para criar consultas complexas no PostgreSQL, aproveitando o poder do SQL enquanto mantém a simplicidade da programação orientada a objetos.

### Como executar

Para executar o projeto:

- Instale as dependências: `yarn`
- Para executar: `yarn run start:dev`
- Com Docker: `docker-compose -f docker-compose.yml up`
- Se deseja executar sem logs, use: `docker-compose -f docker-compose.yml up -d`
