# Etapa de build usando Node.js 22
FROM node:22-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia código e compila
COPY . .
RUN npm run build

# Etapa de execução usando Node.js 22
FROM node:22-alpine AS runner
WORKDIR /app

# Copia apenas artefatos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev

# Expõe a porta padrão configurada (pode ser alterada via env PORT)
EXPOSE 3001
CMD ["node", "dist/main.js"]
