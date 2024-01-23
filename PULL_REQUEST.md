# Pull Request

Está é minha API para um todo-list

## Tecnologias principais

1. Prisma(Object-Relational Mapping):O Prisma é um ORM que simplifica a interação com bancos de dados, fornecendo uma camada de abstração sobre as consultas SQL. Ele permite que você trabalhe com bancos de dados de forma mais intuitiva usando uma linguagem de consulta declarativa.
   TypeScript Suporte Nativo: O Prisma oferece suporte nativo ao TypeScript, o que facilita a integração e proporciona uma experiência de desenvolvimento mais robusta, com verificações de tipo durante o desenvolvimento.

2. TypeScript:

Tipagem Estática: O TypeScript adiciona tipagem estática ao JavaScript, ajudando a detectar erros mais cedo durante o desenvolvimento e melhorando a manutenção do código. Isso é especialmente útil em projetos maiores, onde a escalabilidade e a prevenção de erros são cruciais.

3. Cross-env:

Ambientes Diferentes: Cross-env é utilizado para definir variáveis de ambiente de forma consistente em diferentes plataformas. Isso é útil para gerenciar variáveis de ambiente, como o arquivo .env.development, garantindo que o ambiente de desenvolvimento seja configurado corretamente.

4. Jest:

Testes Unitários e de Integração: Jest é uma estrutura de teste popular para JavaScript e TypeScript. Ele oferece uma configuração simples, suporte para testes unitários e de integração, e permite a execução rápida dos testes. A cobertura de código integrada e a capacidade de testar funções de forma isolada são vantagens adicionais.

5. ESLint:

Padrões de Código Consistentes: ESLint é uma ferramenta de linting que ajuda a manter padrões de código consistentes. Ele pode identificar e corrigir problemas de estilo, potenciais bugs e outros problemas de qualidade de código, promovendo boas práticas de programação.

6.Prettier:

Formatação Automática: Prettier é uma ferramenta de formatação de código que mantém a consistência no estilo do código. Ele automaticamente formata o código de acordo com as regras predefinidas, eliminando discussões sobre estilos de formatação no código-fonte.

7. PostgreSQL (Banco de Dados):

Robustez e Confiabilidade: Escolhi o PostgreSQL como banco de dados devido à sua robustez e confiabilidade. Ele é conhecido por oferecer uma gestão segura e consistente dos dados, suportando transações ACID e proporcionando um alto nível de integridade.
Recursos Avançados: O PostgreSQL oferece uma ampla variedade de recursos avançados, como suporte a tipos de dados complexos, índices avançados e extensibilidade. Essas características são valiosas para projetos que exigem flexibilidade e poder no gerenciamento de dados.
Migrações de Banco de Dados: A capacidade do PostgreSQL de suportar migrações de banco de dados de maneira fácil e controlada é crucial para a evolução contínua do esquema do banco de dados conforme a aplicação se desenvolve.

# Sobre o Desenvolvimento

Este projeto foi construído com base em camadas, sendo elas

```bash
Router, Controller, Service, Repository
```

Escolhi essa arquitetura por fazer parte da maioria dos projetos em que já desenvolvi. Não tive grandes dificuldades no desenvolvimento dessa API; enfrentei alguns desafios ao longo do percurso, mas nada que eu não pudesse resolver.

Meu pensamento sobre como construir essa API não foi dos mais extensos, pois, antes de começar a desenvolvê-la, eu já estava trabalhando em um projeto pessoal full-stack de gerenciamento financeiro. Não queria perder muito tempo para começar, então resolvi adotar a arquitetura que já domino e as tecnologias que utilizo diariamente. Isso resultou em uma API sólida, funcional e de fácil manutenção, pronta para evoluções e adição de novas funcionalidades.

Pensei cuidadosamente nas rotas e nos formatos que minha API possui e espera receber, afinal, a API será consumida por outra pessoa, neste caso, por mim. O que quero dizer com isso é que já ouvi muitos desenvolvedores front-end reclamarem da forma como a API é desenvolvida, o que acaba dificultando o seu consumo. Dessa forma, optei por torná-la o mais simples possível para ser consumida, e deixar as mensagens de erro diretas e simples. Para isso, estou utilizando um Middleware de erro global.

Ao longo do meu desenvolvimento na área de programação, sempre fui instruído a passar o ID do usuário no corpo (body) ou nos parâmetros da rota. No entanto, eu sempre achei um pouco incômodo lidar com isso, especialmente ao realizar testes no Insomnia ou Postman. Atualmente, adotei uma abordagem diferente: automaticamente obtenho o ID do usuário por meio do seu token de autenticação, utilizando o JWT para esse fim. Dessa forma, sempre que um usuário faz uma requisição para uma rota autenticada, minha aplicação extrai o ID do usuário do token logado e o utiliza para enviar ou receber informações da minha API.


## Primeiro passo

Recebi essa demanda na terça-feira à tarde, quando não pude começar imediatamente. No dia seguinte, tive um encontro de bandas em outra cidade, o que me deixou muito cansado. Só consegui iniciar o projeto na quinta-feira. Gosto de trabalhar com o que tenho no momento, então durante a viagem para a outra cidade, aproveitei para fazer a modelagem do banco de dados. Levei um caderninho e fui pensando na melhor forma de estruturar o banco para atender a um fluxo específico. Mesmo que, às vezes, a modelagem seja rápida, uma boa estrutura de banco de dados faz toda a diferença no desenvolvimento e na otimização do desempenho a longo prazo. Depois de alguns rabiscos no caderno, a modelagem do banco de dados estava pronta, e já comecei a pensar nos nomes das rotas e nos fluxos que poderia implementar. Mesmo quando não estando com um PC em mãos, essa prática me economiza bastante tempo no desenvolvimento.






