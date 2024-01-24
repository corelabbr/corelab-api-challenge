

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


## 🎨 Cores para todos os gostos
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/8f43204d-13e0-43dd-b44d-08ae34bff095) -->
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/64b60ed8-3902-41cc-9bee-e0269851e743) -->

### Cores para todos os gostos
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/b4f46edc-2bb4-4c41-9d00-c29598529144) -->

### Design responsivo para todas as telas
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/3c55adb3-01d4-47dd-94ef-0870e4e8aef6) -->
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/b5463a92-ca7f-4e6e-9e68-6fd913d49080) -->

### Pesquise por cores e favoritos
<!-- ![image](https://github.com/mateus-sartorio/corenotes/assets/69646100/614bd7a0-3dd7-4e26-996d-f923ab150880) -->





## ⚙️ Configurar e executar localmente

### Pré-requisitos:

- Node.js 16 (caso deseje rodar a aplicação nativamente)
- Docker

Antes de começar, certifique-se que tenha todos os pré-requisitos para rodar o projeto.

Para checar a versão do Node.js instalada em sua máquina, execute o seguinte comando:

```bash
node --version
```

Caso sua versão não seja a 16, recomenda-se utilizar o `nvm`, que permite instalar e gerenciar várias versões do Node.js em sua máquina ([Repositório com instruções para instalação](https://github.com/nvm-sh/nvm)).

Para o Docker, instruções de instalação para cada sistema operacional são encontradas em sua [documentação oficial](https://docs.docker.com/engine/install/).


### Rodando a aplicação

Clone o repositório localmente, usando `--recuse-submodules`, para garantir que o os repositórios do frontend e do backend sejam clonados corretamente. Em seguida, entre no diretório do respositório clonado:

```bash
git clone https://github.com/mateus-sartorio/corenotes --recurse-submodules
cd corenotes
```

Além disso, é necessário criar um aquivo de variáveis de ambiente (`.env`) no diretório raíz do backend para configurar as URLs de conexão com o banco de dados:

```bash
cd corenotes-backend
touch .env
```

No arquivo criado, crie as seguintes variáveis ambientes (`MONGODB_ENDPOINT` é utilizada pela aplicação em funcionamento normal e `MONGODB_MOCK_ENDPOINT` para testes unitários):

```
MONGODB_ENDPOINT="mongodb://mongo:27017/corelab"
MONGODB_MOCK_ENDPOINT="mongodb://mongo:27017/corelab_mock"
```

Caso prefira utilizar o MongoDB na nuvem, obtenha uma URL de conexão em [MongoDB Atlas](https://www.mongodb.com/atlas/database), e use a URL de conexão para inicializar as variáveis de ambiente, no formato mostrado abaixo:

```
MONGODB_ENDPOINT="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/corelab/?retryWrites=true&w=majority"
MONGODB_MOCK_ENDPOINT="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/corelab_mock/?retryWrites=true&w=majority"
```

Neste caso, recomenda-se também remover o serviço `mongo` em `docker-compose.yml` encontrado na pasta raíz do projeto, uma vez que o banco de dados não precisa mais ser executado localmente.


#### Rodando com Docker

Caso prefira rodar a aplicação com Docker, basta inicializar o Docker Engine, e rodar o seguinte comando na pasta raíz do projeto:

```bash
docker compose up
```

Caso tudo tenha ocorrido conforme o esperado, o frontend deve estar rodando em `localhost:3000` e o backend em `localhost:4000`.


#### Rodando nativamente

Caso prefira rodar a aplicação nativamente, na pasta raíz do backend, instale as dependências do Node.js e depois inicialize o servidor, com os seguintes comandos:

```bash
npm install
npm start
```

Já na pasta raíz do frontend, as dependências também devem ser instaladas antes de inicializar o servidor:

```bash
npm install
npm run dev
```

Caso queira gerar uma build de produção para o frontend, execute em sua pasta raíz:

```bash
npm run build
```

O servidor com a build de produção pode ser inicializado com:

```bash
npm start
```

> [!TIP]
> Ao instalar dependências do Node.js e inicializar os servidores nativamente, sempre certifique-se de estar usando a versão 16 do Node.js
> 
> Para verificar qual versão do Node.js está usando, execute `node --version`
> 
> Caso esteja usando `nvm`, pode-se selectionar a versão 16 do Node.js com o comando `nvm use 16`
> 
> Com o `nvm` é possível também instalar a versão 16 do Node.js, caso ainda não esteja instalada, com o comando `nvm install 16`


## ⚠️ Limitatações

- O sistema ainda não possui um sistema de cadastro e login de usuários.


## 🐞 Bugs conhecidos

- A paleta de selecão de cores (ColorPicker) pode dar overflow na tela caso seja aberta no cartão de uma tarefa muito próxima à margem direita da tela.


## Licença:

Este programa é um software livre: você pode redistribuí-lo e/ou modificá-lo sob os termos da Licença Pública Geral GNU, conforme publicada pela Free Software Foundation; seja a versão 3 da Licença, ou (a seu critério) qualquer versão posterior.

Este programa é distribuído na esperança de que seja útil, mas SEM QUALQUER GARANTIA; sem mesmo a garantia implícita de COMERCIABILIDADE ou ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA. Consulte a Licença Pública Geral GNU para mais detalhes.

Você deveria ter recebido uma cópia da Licença Pública Geral GNU juntamente com este programa. Se não recebeu, consulte [www.gnu.org/licenses/](https://www.gnu.org/licenses/).

Este programa é lançado sob a licença GNU GPL v3+.


## Suporte:

Por favor reporte qualquer problema com a aplicação [github.com/mateus-sartorio/corenotes](https://github.com/mateus-sartorio/corenotes).
