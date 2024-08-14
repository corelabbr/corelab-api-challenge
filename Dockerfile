# Base image
FROM node:20-alpine As development

WORKDIR /app

COPY . .

RUN yarn

CMD [ "./.docker/start.dev.sh" ]
