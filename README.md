

<!-- <p align="center"><img align="center" src="./assets/logo.png"/></p> -->
<p align="center"><img align="center" width="280" src="./.github/logo-light.svg#gh-light-mode-only"/></p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=typescript,next,react,redux" /> <br/>
  <img src="https://skillicons.dev/icons?i=docker,nodejs,mongo,express,jest" /> <br/>
  <a href="#"><kbd>🟢 website</kbd></a>
</p>

# 🗒️ CoreNotes

### Tarefas simplificadas, resultados poderosos.

## 🔥 Funcionalidades

- Salvamento automático de nota na nuvem - acesse suas notas em qualquer lugar
- Design responsivo - interface que se adapta a qualquer dispositivo
- Favorite suas tarefas, se mantenha organizado com as tarefas mais urgentes
- Interface minimalista que mostra apenas o necessário - sem algoritmo para consumir você

## 🍄 Filosofia

Este projeto destina-se a ser simples e fácil de usar. Mantem as funcionalidades mínimas, mas refinadas.

## ⚠️ Limitatações

- Não possui um sistema de cadastro e login de usuários

## 🧬 Configurar e executar localmente para desenvolvimento

To run locally, you must first clone the repository. After that run the following commands in the root of the repository:
```bash
pnpm install
pnpm run dev
```

You have to also make an `.env` file to configure your environment. Inspire it from the content of `example.env`.

To build production files, run:
```bash
pnpm build
```

> [!TIP]
> You must use pnpm (`npm i -g pnpm`) and run NodeJS 20

## 🥔 Selfhosting

A simple guide has been written to assist in hosting your own instance of movie-web. Check it out below

|[Selfhosting guide](https://docs.movie-web.app)|
|---|

## 🐞 Bugs conhecidos

- Paleta de cores pode dar overflow na tela caso seja aberta no cartão de uma tarefa muito pŕoxima da margem direita da tela
