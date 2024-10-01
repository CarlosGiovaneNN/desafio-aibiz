# Desafio AIBIZ

- [Tecnologias usadas](#tecnologias-usadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Rotas](#rotas)
- [Postman](#postman)

## Tecnologias Usadas

 Este projeto implementa uma aplicação especialista em dados de clientes por empresa, no qual será responsável, por adicionar, atualizar e consultar clientes na base de dados. Abaixo está os requisitos técnicos:

1. **Application Progamming Interface**
2.  **NodeJs W/Typescript**
3.  **Framework NestJs**
4.  **Banco de dados MongoDB**

## Instalação
### Clone o repositório: 
```bash 
git clone https://github.com/CarlosGiovaneNN/desafio-aibiz.git
```
### Instalando o Node.js 
1. **Para Windows e macOS**:
 - Acesse o site oficial do [Node.js](https://nodejs.org/). 
 - Baixe o instalador para o seu sistema operacional. 
 - Execute o instalador e siga as instruções.
  2. **Para Linux**:
  - Abra o terminal e execute os seguintes comandos:
```bash
sudo apt update sudo apt install nodejs npm 
``` 
### Instalando o Yarn
Após instalar o Node.js, você pode instalar o Yarn usando o npm (gerenciador de pacotes do Node):

```bash 
npm install --global yarn
```

### Instalando as dependências
Após instalar o Yarn, você precisa insatalar as dependências do codigo:

```bash 
yarn
```

### Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias:

 ```bash
DATABASE_CONECTION = seu banco
JWT_SECRET = qualquer string
``` 
 
## Uso 
 1. Inicie o servidor de desenvolvimento: 
 ```bash
yarn start:dev
``` 
 2. Acesse a API via `http://localhost:3000`.
## Rotas
### Enterprise 
- **POST**: `/enterprise/create` -> Cria uma empresa.
#### Body:
```javascript
{  
"name": "nome-exemplo" 
}
``` 
 
- **POST**: `/enterprise/token` -> Gera um novo token para a empresa.
#### Body:
```javascript 
{  
"name": "nome-exemplo" 
}
```

- **DELETE**: `/enterprise/delete` -> Deleta a empresa. 
#### Query:
```javascript 
name:name 
value:nome-da-empresa
```
### Client
- **POST**: `/client/create` -> Cria o cliente para a empresa.
#### Request:
```javascript 
token-referente-a-empresa
```
#### Body:
 ```javascript 
{ 
 "name": "nome-do-cliente",
 "email": "email-exemplo@gmail.com",
 "phone": numero-do-cliente
 }
``` 
 
- **PUT**: `/client/update/:id` -> Atualiza o dado do cliente. 
#### Request:
```javascript 
token-referente-a-empresa
```
#### Param: 
 ```javascript 
 id-do-cliente
```
#### Body: 
 ```javascript 
{ 
 "name": "nome-do-cliente",
 "email": "email-exemplo@gmail.com",
 "phone": numero-do-cliente
}
``` 
 
 - **GET**: `/client/search/:id` -> Retorna os dados de um cliente específico.
#### Request:
```javascript 
token-referente-a-empresa
```
#### Param: 
 ```javascript 
 id-do-cliente
```

- **GET**: `/client/searchAll` -> Mostra todos os clientes da empresa.
#### Request:
```javascript 
token-referente-a-empresa
```
 
- **DELETE**: `/client/:id` -> Remove o cliente específico. 
#### Request:
  ```javascript 
  token-referente-a-empresa
  ```
#### Param: 
 ```javascript 
 id-do-cliente
```
## Postman
link do postman:
https://www.postman.com/spaceflight-participant-41452383/desafio-aibiz/overview
