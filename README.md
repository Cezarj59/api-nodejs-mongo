# API Restful em Node.js com Express e MongoDB Atlas.

![Node.js](https://img.shields.io/badge/Node.js-LTS-brightgreen)
![Express](https://img.shields.io/badge/Express-4.17.1-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM%20for%20MongoDB-yellow)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-Cloud%20Database-brightgreen)
![Render](https://img.shields.io/badge/Render-Hosting-lightgrey)
![Insomnia](https://img.shields.io/badge/Insomnia-API%20Testing-success)

## Visão Geral

Este projeto é uma API RESTful desenvolvida em Node.js utilizando o framework Express. A API oferece operações de cadastro (sign up), autenticação (sign in), recuperação de informações do usuário e busca de usuário autenticado. Utiliza JSON como formato de comunicação, JWT para autenticação e MongoDB Atlas como banco de dados na nuvem e Mongoose utilizado para mapeamento de dados.

## Objetivos

- Desenvolvimento de uma API RESTful em Node.js com Express
- Implementação de operações de cadastro, autenticação, recuperação de informações e busca de usuário autenticado
- Utilização de JSON como formato de comunicação
- Autenticação com JWT (JSON Web Tokens)
- Criptografia hash na senha e token para maior segurança
- Banco de dados MongoDB Atlas na nuvem

## Tecnologias Utilizadas

- Node.js (LTS)
- Express 4.17.1
- JWT para autenticação
- Mongoose (Object Data Modeling para MongoDB)
- MongoDB Atlas para armazenamento de dados
- Render para hospedagem
- Insomnia para testes de API

## Como Usar

1. Clone este repositório (Opcional: Se você estiver interessado em examinar o código-fonte ou contribuir para o projeto).
   
2. Configure seu ambiente de desenvolvimento com as tecnologias mencionadas.

3. Execute a aplicação Node.js. Utilize o seguinte comando no terminal:

   ```bash
   npm start
   # ou
   node src/server.js


4. Utilize os seguintes endpoints para realizar operações na API:

   - **Cadastro de Usuário:**

locahost:

     ```json
     [POST] https://localhost:3001/auth/cadastro

     ```
ou

    ```json
     [POST] https://api-escribo-x2y3.onrender.com/auth/cadastro
     ```

   - **Autenticação de Usuário:**
     ```
     [POST] https://api-escribo-x2y3.onrender.com/auth/login
     ```
     Nota: A busca de usuários autenticados requer autenticação via Bearer Token. Certifique-se de incluir na sua requisição: Bearer TOKEN.

   - **Busca de Usuários Autenticados:**
     ```
     [GET] https://api-escribo-x2y3.onrender.com/admin/users
     ```

   - **Atualização de Usuário:**
     ```
     [PUT] https://api-escribo-x2y3.onrender.com/auth/users/:id
     ```

Certifique-se de que as tecnologias necessárias estejam configuradas no seu ambiente antes de utilizar os endpoints. Você pode usar ferramentas como o __`INSOMNIA`__, __`cURL`__ ou __`POSTMAN`__ para realizar as operações na API.

## Como Testar os Endpoints

Você pode utilizar o cURL para testar os endpoints diretamente do terminal ou linha de comando. Abaixo estão alguns exemplos básicos:

### Cadastro de Usuário
```bash
curl -X POST -H "Content-Type: application/json" -d '{"nome":"SeuNome", "email":"seuemail@example.com", "senha":"suasenha", "telefone":{"numero":"seunumero", "ddd":"seuddd"}}' https://api-escribo-x2y3.onrender.com/auth/cadastro
```
### Login
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"seuemail@example.com", "senha":"suasenha"}' https://api-escribo-x2y3.onrender.com/auth/login

```
### Busca de Usuários Autenticados
```bash
curl -X GET -H "Authorization: Bearer TOKEN_AQUI" https://api-escribo-x2y3.onrender.com/admin/users

```
### Atualização de Usuário (Exemplo com ID "seuid")
```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_AQUI" -d '{"nome":"NovoNome", "email":"novoemail@example.com", "telefone":{"numero":"novonumero", "ddd":"novoddd"}}' https://api-escribo-x2y3.onrender.com/auth/users/seuid
```

# Endpoints

A seguir estão os endpoints disponíveis neste projeto:

- ## <span style="font-size:larger;">Cadastro de Usuário</span>
  - **URL:** [https://api-escribo-x2y3.onrender.com/auth/cadastro](https://api-escribo-x2y3.onrender.com/auth/cadastro)
  - **Método:** POST
  - **Input:**
    - Campos necessários para cadastro (ex: nome, email, senha, telefone{numero,ddd})


```json
{
  "nome": "string",
  "email": "string",
  "senha": "senha",
  "telefone": {
    "numero": "123456789",
    "ddd": "11"
  }
}
```
      
  - **Output (sucesso):**
    - Retorno com informações do usuário cadastrado

```json
{
  "id": "GUID/ID",
  "data_criacao": "data",
  "data_atualizacao": "data",
  "ultimo_login": "data",
  "token": "GUID/JWT"
}
```

  - **Erro:**
    - E-mail já cadastrado: `{ "mensagem": "E-mail já existente" }`

- ## <span style="font-size:larger;">Login de Usuário</span>
  - **URL:** [https://api-escribo-x2y3.onrender.com/auth/login](https://api-escribo-x2y3.onrender.com/auth/login)
  - **Método:** POST
  - **Input:**
    - E-mail e senha do usuário

   
 ```json
{
  "email": "string",
  "senha": "senha"
}
```
      
  - **Output (sucesso):**
    - Retorno com token de autenticação

   ```json
{
  "id": "GUID/ID",
  "data_criacao": "data",
  "data_atualizacao": "data",
  "ultimo_login": "data_atualizada",
  "token": "GUID/JWT"
}
```

  - **Erros:**
    - E-mail não cadastrado ou senha incorreta: `{ "mensagem": "Usuário e/ou senha inválidos" }`
    - Senha incorreta: Status 401 com `{ "mensagem": "Usuário e/ou senha inválidos" }`

- ## <span style="font-size:larger;">Buscar Usuários (Admin)</span>
  - **URL:** [https://api-escribo-x2y3.onrender.com/admin/users](https://api-escribo-x2y3.onrender.com/admin/users)
  - **Método:** GET
  - **Requisição:** Header Authentication com valor "Bearer {token}"
  - **Output (sucesso):**
    - Retorno com informações dos usuários
      
```json
   {
      "id": "6563873da187f9f7405a7026",
      "nome": "string",
      "email": "string",
      "iat": 1701021502,
      "exp": 1701023302
    }
```
      
  - **Erros:**
    - Token inválido: `{ "mensagem": "Não autorizado" }`
    - Token expirado (mais de 30 minutos): `{ "mensagem": "Sessão inválida" }`

- ## <span style="font-size:larger;">Atualizar Usuário</span>
  - **URL:** [https://api-escribo-x2y3.onrender.com/auth/users/:id](https://api-escribo-x2y3.onrender.com/auth/users/:id)
  - **Método:** PUT
  - **URL Params:**
    - `:id` - ID do usuário a ser atualizado
  - **Input:**
    - Campos a serem atualizados (ex: nome, email, telefone) em formato JSON

```json
{
  "nome": "Novo Nome",
  "email": "novoemail@example.com",
  "telefone": {
    "numero": "987654321",
    "ddd": "11"
  }
}
```
      
  - **Output (sucesso):**
    - Retorno com informações atualizadas do usuário
```json
   {
  "mensagem": "Usuário atualizado com sucesso",
  "id": "ID",
  "data_criacao": "Data",
  "data_atualizacao": "Data_atualizada",
  "ultimo_login": "Data",
  "token": "Token"
}
```      
  - **Erros:**
    - Email já Cadastrado: `{ "mensagem": "E-mail já existente" }`

## Estrutura do Projeto

A estrutura deste projeto segue a organização abaixo:

- `src`: Contém o código-fonte Node.js da aplicação.
- `config`: Armazena configurações específicas da aplicação.
- `controllers`: Responsável por conter os controladores da lógica de negócios.
- `database`: Mantém os arquivos relacionados ao banco de dados, como conexões e configurações.
- `middlewares`: Contém middlewares utilizados na aplicação.
- `models`: Guarda os modelos de dados utilizados na aplicação.
- `server.js`: Ponto de entrada da aplicação, contendo as configurações e definição das rotas da API.
- 


## Sistema de Build com Gerenciamento de Dependências

O projeto utiliza o npm (Node Package Manager) para:

- **Gerenciamento de Dependências:** Todas as dependências do projeto são definidas no arquivo `package.json` e podem ser instaladas usando o comando:
  ```bash
  npm install
  
## Padronização de Código

- **ESLint:** O projeto utiliza o ESLint para manter a consistência no estilo do código. Os padrões de estilo são definidos no arquivo `.eslintrc.json` e a verificação pode ser feita com o comando:
  ```bash
  npm run lint
  


##  <h3 align="left">Languages and Tools:</h3>
<p align="left">
  <a href="https://www.javascript.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/> </a>
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50"/> </a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="50" height="50"/> </a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer"> <img src="https://jwt.io/img/pic_logo.svg" alt="jwt" width="50" height="50"/> </a>
  <a href="https://mongoosejs.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Mongoose-ODM%20for%20MongoDB-yellow" alt="mongoose" width="50" height="50"/> </a>
  <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="50" height="50"/> </a>
  <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" alt="npm" width="50" height="50"/> </a>
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="50" height="50"/> </a>
  <a href="https://eslint.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original-wordmark.svg" alt="eslint" width="50" height="50"/> </a>
  <a href="https://ubuntu.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-plain-wordmark.svg" alt="ubuntu" width="50" height="50"/> </a>
  <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-plain-wordmark.svg" alt="vscode" width="50" height="50"/> </a>
</p>




