# STAGE 1
ARG NODE_IMAGE=node:16.0.0

FROM $NODE_IMAGE AS base
RUN addgroup app && adduser --system --group app
RUN mkdir -p /app && chown app:app /app
USER app

WORKDIR /app
# STAGE 2
FROM base AS dependencies
COPY ./package*.json ./
RUN npm ci
COPY . .

# STAGE 3
FROM dependencies AS build
RUN node ace build --production

# STAGE 4
FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY ./package*.json ./
RUN npm ci --production
COPY --from=build /app/build .
EXPOSE $PORT

CMD [ "npm", "start" ]
