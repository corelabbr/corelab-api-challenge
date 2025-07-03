# Descrição do Projeto

API RESTful para gerenciamento de usuários e notas, seguindo boas práticas de autenticação, autorização, versionamento de banco e containerização.

## Tecnologias Utilizadas

- **NestJS**: Framework principal para a API.
- **TypeORM**: ORM para integração com banco de dados relacional (PostgreSQL).
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.
- **bcrypt**: Hash de senhas.
- **Swagger**: Documentação automática da API.
- **Docker**: Containerização da aplicação e do banco.
- **Jest**: Testes unitários.
- **ESLint/Prettier**: Padronização e qualidade de código.

## Principais Implementações

- **Autenticação e Autorização**: JWT para autenticação, Guards e Decorators para roles (USER/ADMIN).
- **Migrations**: Uso de migrations do TypeORM para versionamento do banco, nunca usando `synchronize: true` em produção.
- **DTOs e Validação**: Uso de DTOs para entrada e saída, garantindo segurança e clareza.
- **Swagger**: Configurado em `main.ts` para documentação acessível em `/api`.
- **Dockerização**: Dockerfile para a API.
- **Testes**: Cobertura de testes unitários para services e controllers principais.

## Fluxo de Deploy/Execução

1. **Desenvolvimento**:
   - Rodar localmente com `.env` e banco local ou via Docker Compose.
2. **Build**:
   - `npm run build` gera arquivos em `dist/`.
3. **Migrations**:
   - Gerar com `npm run migration:generate`, aplicar com `npm run migration:run`.
4. **Produção**:
   - Alterar no `.env` a variável `TYPEORM_SYNCHRONIZE` para `false`
5. **Documentação**:
   - Disponível em `/api` via Swagger.

## Observações

- Toda alteração de schema é feita via migration.
- API pronta para ambientes dev e prod, com configurações separadas.
- Segurança garantida por JWT, roles e hash
