FROM node:20-alpine
WORKDIR /usr/src/corenotes-api
COPY package.json ./
COPY package-lock.json ./
COPY . .
EXPOSE 3333
ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

USER node