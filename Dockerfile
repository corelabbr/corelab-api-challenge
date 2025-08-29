# Use uma imagem oficial do Node
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e yarn.lock
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia todo o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para rodar a API
CMD ["node", "--require", "ts-node/register", "src/index.ts"]
