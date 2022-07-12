## Corelab Challenge

Este projeto consiste em uma plataforma de anúncios de veículos, sendo possível logar em sua conta do google para poder criar anúncios de veículos, editar seus anúncios existentes assim como deletá-los. Além disso é possível favoritar os veículos e visualizar seus favoritos posteriormente.

## Rotas

**vehicles** - A rota de veiculos é responsável por realizar um crud de veículos.

- Get -> Retorna todos os veículos cadastrados[localhost:3333/api/vehicles/]
- GetId -> Retorna um veículo pelo seu id [localhost:3333/api/vehicles/:vehicle_id]
- GetByUser -> Retorna todos os veículos criados pelo usuário logado na plataforma [localhost:3333/api/adverts/:user_id]
- Post -> Cria um veículo [localhost:3333/api/vehicles/]
- Put -> Atualiza o veículo cadastrado pelo seu id [localhost:3333/api/vehicles/:vehicle_id]
- Delete -> Deleta o veículo cadastrado pelo seu id [localhost:3333/api/vehicles/:vehicle_id]

**Favorites** - A rota de favoritos é responsável por realizar a ponte entre os usuários e seus veículos favoritados.

- Get -> Retorna todos os veículo favoritados[localhost:3333/api/favorites/]
- GetId -> Retorna todos os veículos favoritaods pelo usuário logado na plataforma [localhost:3333/api/favorites/:user_id]
- Post -> Cria a relação do veículos favoritado pelo usuário [localhost:3333/api/favorites/]

### Autenticação e login

- Toda a autenticação de login é realizado através do front-end pela plataforma firebase, portanto qualquer user_id cadastrado nas tabelas é advindo do front-end e não possui qualquer relação com outra tabela.

# Instalação e execução do projeto:

1. Clone o repositório na sua máquina.
2. Execute o comando npm install deste projeto para adicionar todas as suas dependências.
3. Criar o banco de dados e configurar com suas credenciais o arquivo .env
4. Executar com o comando [node ace migration:run] para executar as migrations e criar as tabelas no banco.
5. Execute o projeto com [node ace serve]