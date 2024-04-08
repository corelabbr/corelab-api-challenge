# Meu Projeto

Este é um projeto construído com Adonis.js usando TypeScript e Docker.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/mactavishkkk/nodejs-api-challenge.git
```
2. Navegue até o diretório dos arquivos de construção:

```bash
cd nodejs-api-challenge/docker
```

3. Construa os ambientes com docker, usando:
```bash
docker compose up --build || docker-compose up --build
```