FROM node:20.4-alpine
WORKDIR /usr/src/app
COPY package.json dist/ ./
RUN npm install --production 
EXPOSE 8003
CMD : ['node', 'dist/index.js']


