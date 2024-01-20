FROM node:16.15.0

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 8080
