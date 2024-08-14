FROM node:alpine

WORKDIR /app/backend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]