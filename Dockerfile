FROM node:alpine

WORKDIR /app

COPY ./package.json /app
COPY ./pnpm-lock.yaml /app

RUN npm install -g pnpm && pnpm i

COPY . /app

RUN npx prisma generate

EXPOSE 3001

CMD pnpm dev
