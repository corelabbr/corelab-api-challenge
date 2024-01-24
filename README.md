# Backend

O nosso backend foi desenvolvido utilizando a ORM Sequelize para facilitar o desenvolvimento e trazer mais praticidade. Antes de colocar o backend em funcionamento, é necessário criar o arquivo `.env`, que não pode ser incluído no repositório, pois contém informações sensíveis.

## Como Executar o Projeto Node.js

### Instalação de Dependências

Certifique-se de ter o Node.js instalado no seu sistema. Em seguida, no terminal, navegue até a pasta do projeto backend e execute o comando:

```
npm install
```
Configuração do Banco de Dados

Certifique-se de que o servidor Apache e MySQL do XAMPP ou WAMPP estejam em execução. Em seguida, execute o seguinte comando para criar o banco de dados:

```
npx sequelize-cli db:create
```
Criação das Tabelas

Para criar as tabelas no banco de dados, execute o seguinte comando:


```
npx sequelize-cli db:migrate
```
Inicialização do Servidor Backend

Agora, para iniciar o servidor backend, utilize o seguinte comando:

bash
```
npm run dev
```
Certifique-se de usar pnpm, pois pode ser a ferramenta de gerenciamento de pacotes específica do projeto. Caso não tenha o pnpm instalado globalmente, você pode instalar com o comando:

bash
```
npm install -g npm
```
Nota: Apesar de colocarmos o ficheiro .env para facilitar a execução, é importante ressaltar que não é uma boa prática incluir informações sensíveis diretamente no repositório. Certifique-se de seguir as melhores práticas de segurança para proteger essas informações.
