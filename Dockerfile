FROM node:16.15.0

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

RUN npm run prisma:generate

RUN npm run tsc

USER node

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080 DATABASE_URL="mongodb://db:27017/replicaSet=rs0"

CMD ["npm", "start"]
