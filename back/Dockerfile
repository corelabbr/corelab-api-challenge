FROM node:22.14.0

ENV TZ=America/Campo_Grande

WORKDIR /api

COPY package*.json prisma ./

RUN npm install

RUN npm install -g cross-env

RUN npx prisma generate

COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it

RUN sed -i 's/\r$//' /usr/local/bin/wait-for-it

RUN chmod +x /usr/local/bin/wait-for-it

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 5050

CMD ["npm", "start"]
