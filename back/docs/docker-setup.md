# Gerando a Imagem Docker para a Aplicação NexoTaskAPI

Este documento fornece as instruções para gerar a imagem Docker para a aplicação **NexoTaskAPI** a partir do **Dockerfile**.

## Pré-requisitos

- **Docker**: Certifique-se de que o Docker está instalado e funcionando no seu sistema.
- **Dockerfile**: O arquivo `Dockerfile` deve estar presente na raiz do seu projeto.
- **Dockercompose**: O arquivo `docker-compose.yml` deve estar presente na raiz do seu projeto.

## Passos para Gerar a Imagem Docker

### 1. Navegue até o Diretório do Projeto

Abra o terminal e navegue até o diretório onde o `Dockerfile e docker-compose.yml` está localizado. No seu, execute:

```bash
cd .\GitHub

cd .\nexo-task-api
```

### 2. Execute o Comando para Construir a Imagem

Com o terminal no diretório correto, execute o seguinte comando para gerar a imagem Docker:

```bash
docker-compose up -d --build
```
**Explicação do comando:**

`docker-compose up`: Inicia os containers definidos no arquivo **docker-compose.yml**.

`-d`: Executa os containers em segundo plano (modo "detached").

`--build`: Garante que as imagens sejam construídas antes de iniciar os containers. Caso as imagens já existam, elas serão reconstruídas.

### 3. Verifique a Imagem Criada

Após a execução do comando acima, você pode verificar se a imagem foi criada com sucesso executando o comando:

```bash
docker images
```

Isso irá listar todas as imagens Docker no seu sistema. A imagem `nexotaskapi-api` e `postgres` deve aparecer na lista.

## Executando o Container Docker

Depois de gerar a imagem, você pode rodar o container a partir dela com o seguinte comando:

```bash
docker run -d -p 127.0.0.1:5432:5432 --name postgres-container postgres

docker run -d -p 127.0.0.1:5050:5050 --name nexo-api --link postgres-container:postgres nexotask-api
```

Isso vai rodar o container e mapear a porta 3001/front e 3002/back do container para a porta 3001/front e 3002/back da sua máquina local, tornando a aplicação acessível.
