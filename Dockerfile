FROM node:16.20.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node ace build --production

EXPOSE 3001

CMD ["node", "build/server.js"]