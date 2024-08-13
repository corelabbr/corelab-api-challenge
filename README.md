# Documentação do Desafio Corelab

## Requisitos
 - Node.js >= 18.x
 - PostgreSQL >= 12.x
 - Docker e Docker-compose
 - pnpm(opcional)

## Instalação

### Configuração do ambiente

1. **Configure as variáveis de ambiente**
```bash
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/corelab?schema=public"

APP_URL=http://localhost:3000

PORT=3001

NODE_ENV=development
```
2. **Starte o Docker**
```bash
docker-compose build && docker-compose up 
```

3. **Configure o Prisma**
```bash
docker exec -it app /bin/sh
npx prisma migrate dev
npx prisma generate
pnpm seed
```
## Uso

### Execute o Servidor em Desenvolvimento
Inicie o servidor de desenvolvimento com:
```bash
pnpm dev
```
O servidor estará disponivel na porta [3001](http://localhost:3001).

### Scripts
 
- Iniciar o Servidor em modo de produção: **`pnpm start`**
- Iniciar o Servidor: **`pnpm dev`**
- Rodar Testes: **`pnpm test`**
- Criar dados iniciais: **`pnpm seed`**
- Formatar os Arquivos: **`pnpm format`**
- Executar Lint: **`pnpm lint`**

## Estrutura do Projeto
 - **`src/`**: Contém o código-fonte da aplicaçao.
    - **`api/`**: Lógica de serviço da aplicação.
       - **`controllers/`**: Lógica de controle das rotas.
       - **`errors/index.ts`**: Mensagens de erro da aplicação.
       - **`exceptions/`**: Definições de exceptions personalizadas da aplicação.
       - **`types/`**: Definição de tipos da API.
    - **`config/`**: Configurações da aplicação servidor.
    - **`libs/`**: Configurações de bibliotecas e dependências externas.
    - **`middlewares/`**: Middlewares personalizados para processamento de requesições.
    - **`tests/`**: Testes unitãrios.
    - **`utils/`**: Funções utilitárias e auxiliares.
      - **`utils/validation.ts`**: Funções para validação de dados.
    - **`app.ts`**: Arquivo de setup da api.
    - **`env.ts`**: Variavies de ambiente do arquivo .env.
    - **`server.ts`**: Inicialização do servidor.
 - **`prisma/schema.prisma`**: Arquivo para criação de modelos no banco de dados.
 - **`.dockerignore`**: Lista de arquivos e pastas a serem ignorados pelo Docker.
 - **`.editorconfig`**: Configuração para padronização do estilo de código entre diferentes editores de código.
 - **`.env`**: Arquivo de variáveis de ambiente para configuração da aplicação.
 - **`.gitignore`**: Lista de arquivos e pastas a serem ignorados pelo Git.
 - **`.prettierignore`**: Arquivos e pastas a serem ignorados pelo Prettier.
 - **`Dockerfile`**: Arquivo de configuração para construir a imagem Docker da aplicação.
 - **`README.md`**: Documentação principal do projeto.
 - **`docker-compose.yml`**: Arquivo de configuração para orquestração de containers Docker.
 - **`eslint.config.mjs`**: Configuração do ESLint para análise estática do código.
 - **`jest.config.js`**: Configuração do Jest para execução dos testes.
 - **`package.json`**: Gerenciamento de dependências e scripts da aplicação.
 - **`pnpm-lock.yaml`**: Arquivo de lock para o gerenciador de pacotes PNPM.
 - **`singleton.ts`**: Arquivo para implementação de padrão Singleton com prisma.
 - **`tsconfig.json`**: Configuração do TypeScript.

## Desenvolvimento
### Adicionar novos recursos
1. **Criar Novo Modelo**
 - Atualizar o arquivo **`shcema.prisma`** com um novo modelo.
 - Gere e Aplique as migrações:
    ```bash
    npx prisma migrate dev 
    npx prisma generate
    ```
2. **Adicionar Novos Endpoints**
 - Crie um novo controller em **`src/api/controllers`**.
 - Defina novas rotas em **`src/config/routes.ts`**.
 - Teste os novos endpoints com ferramentas como insomnia.

## Testes
 - Escreva testes para suas rotas e lógica de negócios.
 - Utilize Jest para testar seu código.
