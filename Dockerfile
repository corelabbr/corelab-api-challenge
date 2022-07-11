FROM node:18-slim

WORKDIR /home/src/backend

COPY . .


CMD ["sh", "-c","npm install && npm run start:dev"]