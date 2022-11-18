<h1 align="center">DT TransferMoney</h1>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

[<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">](https://www.typescriptlang.org/)
[<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">](https://pt-br.reactjs.org)

## 💻 Projeto

Um Projeto completo, com front e back-end, no front foi usado reactJs, já no back-end node, prismaORM e postgresql com docker

## 🚀 Como executar
- Clone e acesse o repositório

## Server

### Preparando o ambiente
 - você precisa primeiramente do node instalado na sua máquina ([Como instalar](https://nodejs.org/en/)) e criar seu banco de dado `postgresql` com docker, se não souber como instalar veja aqui: [Docker](https://www.docker.com/)

- crie seu banco de dados 

- mude o nome da pasta `.env.example` para `.env` e preencha `DATABASE_URL` com os dados do seu contâiner postgres feito no passo anterior com docker, e preencha `SECRET_TOKEN` com um md5 hash string

- No `terminal` execute o comando `npm install`

- Ainda no `terminal` execute o comando `npx prisma migrate dev`

- Seguido por `npm run dev`

## WEB
- Acesse a pasta `web`

- No `terminal` execute `npm install`

- mude o nome da pasta `.env.example` para `.env`

- Seguido por `npm run dev`

