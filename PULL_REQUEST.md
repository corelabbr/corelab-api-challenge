# Entrega do Desafio Técnico – Corelab

Abaixo está um resumo técnico da entrega, destacando as principais decisões de arquitetura, funcionalidades implementadas e instruções de execução. O projeto foi desenvolvido com atenção à separação de responsabilidades, boas práticas e foco em responsividade.


## Decisão Técnica – Backend

**Stack escolhida:** Node.js + TypeScript com arquitetura limpa e Prisma ORM

Utilizei  Node.js com TypeScript para garantir robustez e segurança no desenvolvimento, aplicando a Clean Architecture para manter a separação de responsabilidades e facilitar manutenção, testes e escalabilidade.

A estrutura do projeto foi dividida em camadas (domain, usecases, infrastructure, interfaces, etc.), permitindo um fluxo claro de dados e regras de negócio desacopladas de detalhes de implementação.



Outros pontos adotados:
- O Prisma ORM foi escolhido por sua excelente integração com TypeScript, suporte a migrations versionadas e modelo declarativo.
- Utilizei o PostgreSQL por ser um banco relacional confiável e bem documentado.
- Para autenticação, usei JWT, mantendo a aplicação stateless e simplificando o gerenciamento de sessões.
- O envio de e-mails foi implementado com Nodemailer, encapsulado dentro de um serviço próprio na camada de infraestrutura.
- Testes com Vitest garantem que os casos de uso e utilitários centrais se comportem conforme esperado.
- Swagger e documentação por arquivos Markdown foram usados para descrever as rotas e funcionalidades.
  

## Decisão Técnica – Frontend

**Stack escolhida:** React + TypeScript com Vite, Tailwind CSS e abordagem Mobile First

No frontend, escolhi React com TypeScript e utilizei o Vite como bundler para obter um ambiente de desenvolvimento rápido, com hot reload eficiente.

A estilização foi feita com Tailwind CSS, que oferece:
- Agilidade no desenvolvimento visual
- Responsividade nativa (via classes utilitárias)
- Layouts consistentes e leves sem acoplamento excessivo com CSS tradicional
  
Outras decisões técnicas:
- Componentes desacoplados e reutilizáveis (como TaskItemCard, ColorPickerModal, InputField)
- React Router para navegação entre páginas (Login, Dashboard, Recuperação de Senha, etc.)
- Filtros visuais implementados de forma intuitiva para cor, data e prioridade
- Ícones com Lucide React para uma interface moderna e limpa
- Abordagem Mobile First para garantir responsividade e usabilidade em dispositivos menores
- Comunicação com a API feita via fetch, com controle de erros e carregamento

## Estrutura Geral

```bash
nexo-task-api/
├── back/                 # Backend (Node.js, Clean Architecture)
├── front/                # Frontend (React + Vite)
├── docker-compose.yml    # Orquestra front, back e banco
├── LICENSE               # Licença MIT
├── .github/workflows/    # CI/CD (merge automatizado, PR template)
└── .vscode/              # Configurações de debug
```
## Funcionalidades Implementadas

- [x] CRUD completo de tarefas

- [x] Marcar/desmarcar tarefas como favoritas

- [x] Definir e exibir cor por tarefa

- [x] Filtro por cor, data e favoritos

- [x] Favoritos destacados no topo da lista

- [x] Autenticação com JWT (Login / Cadastro / Logout)

- [x] Recuperação e redefinição de senha via e-mail

- [x] Responsividade total (Mobile First)

## Prints da Interface

Os prints do sistema estão disponíveis na pasta /png:

- Cadastro, Login, Dashboard, Edição de Card

- Filtro por Cor e Prioridade

- Recuperar e Redefinir Senha

## Execução Local

```bash
# Subir o sistema com Docker
docker-compose up -d --build

# Acessar:
Frontend: http://localhost:3001
Backend:  http://localhost:3002
```

Para mais detalhes sobre instalação, configuração e execução, consulte o [README.md principal](./README.md) na raiz do projeto, bem como os arquivos `README.md` localizados nas pastas `back` e `front`, que contêm instruções específicas para cada parte da aplicação.

