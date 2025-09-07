FROM node:16-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Não copiar node_modules do host
RUN npm install --production=false

COPY . .
# Excluir node_modules do host se copiado
RUN rm -rf node_modules
RUN npm install

EXPOSE 3333
CMD ["npm", "run", "dev"]