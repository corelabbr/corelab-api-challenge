FROM node:22.17.0 

WORKDIR /api
ADD . .
RUN npm ci
RUN node ace build
RUN node ace generate:key
COPY ./.env ./build/.env
COPY ./node_modules ./build/node_modules
ENV HOST=0.0.0.0
ENV DB_HOST=mysql
ENV NODE_ENV=production
EXPOSE $PORT
CMD ["node", "./build/bin/server.js"]
