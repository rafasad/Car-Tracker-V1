
<h1 align="center">
   Car Tracker - V1
</h1>

<p align="center">
  <a href="#page_with_curl-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-iniciando-aplicação">Iniciando aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-utilizando">Utilizando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#white_check_mark-testes">Testes</a>&nbsp;&nbsp;&nbsp;
</p>


## :page_with_curl: Sobre
Este repositório contém uma API em TypeScript como back-end. Essa é a aplicação Car Tracker - V1, que é uma plataforma de rastreamento de veículos. Nessa aplicação o usuário consegue ter acesso a todos os seus veículos cadastrados e assim através de um endpoint verificar todas as informações relevantes à localização atual do veículo.

Já o equipamento (rastreador), através de uma porta exclusiva (9000), consegue ter acesso ao servidor, podendo enviar o Heartbeat e recebendo o ping ack. E também enviando sua Localização para ser processada e salva.

***TypeScript***:  A escolha foi feita por ser uma linguáguem tipada e pois se trata de uma aplicação que pode se tornar de grande porte. Assim quando mais pessoas começarem  a trabalhar juntos no projeto o uso de interfaces irá ajudar no entendimento e identificação de bugs.

***Metodologia***:  Foram utilizadas as seguintes metodologias:

 1. DDD
 2. Liskov Substitution Principle
 3. Dependency Inversion Principle

 ***Estrutura de pastas***: A estrutura de pasta basicamente foi feita para quê a aplicação tenha uma alta escalabilidade. Assim, caso queira mudar o ORM ou outro serviço o desacoplamento será de maneira fácil e caso também aplicação precise de novos recursos a estrutura de pastas está inteiramente preparada para receber devido ao Liskov Substitution Principle.

A estrutura de pasta interna dos módulos infra que contém http e typeorm está de forma separadas dos repositórios e dos serviços para caso queira mudar, a nova biblioteca de serviço entrará no lugar substituindo. Assim precisando mexer o mínimo de código possível para fazer a integração, pois o repositório do módulo, fora do typeorm contém todas as funções com seus parametros e retornos mapeados para integrar com o novo serviço.

Tudo o que é compartilhado ou necessário para o início dos servidores está localizado na pasta shared.

A pasta @types contém as tipagens extras para completar o express e a pasta config contém as configurações de serviços e bibliotecas usadas.


## :books: Requisitos
- Ter [**Git**](https://git-scm.com/) para clonar o projeto.
- Ter [**Node.js**](https://nodejs.org/en/) instalado.
- Ter [**Docker**](https://www.docker.com/) rodando um container com PostgreSQL e outro com MongoDB.

## :gear: Instalação
``` bash
  # Criar docker postgres
  $ docker run --name carTracker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=tracker -p 5432:5432 -d postgres

  # Criar docker mongo
  $ docker run --name carTrackerMongo -p27017:27017 -d mongo

  # Clonar o projeto:
  $ git clone https://github.com/rafasad/Car-Tracker-V1

  # Entrar no diretório:
  $ cd Car-Tracker-V1

  # Copiar o arquivo .env :
  $ cp .env.example .env

  Abra o arquivo .env e coloque um APP_SECRET
```

## :rocket: Iniciando aplicação
```bash
  # Instalar as dependências:
  $ yarn install

  # Rodar as migrations e seeds:
  $ yarn typeorm migration:run
  $ yarn seed:run

  # Rodar a aplicação http:
  $ yarn dev:server

  # Rodar a aplicação tcp em outro terminal:
  $ yarn dev:tcp

  # Para simular o rastreador criei um cliente de teste. Para rodar utilize o comando em outro terminal:
  $ yarn dev:client
```

![enter image description here](https://ik.imagekit.io/rafaelsad/2020-08-12_12-42-33_iDhffyNArc.gif)


## :computer: Utilizando

 <h4> No terminal do cliente (Equipamento) com o servidor TCP rodando, envie as mensagem. Caso seja do tipo 01 Ping, receberá uma resposta que é o Ping ACK de volta. Caso seja do tipo 02 o servidor processará os dados e fará a inserção dos dados caso esteja tudo correto. </h4>

<p>OBS: Toda menságem é verificada para ver se o header é compativel com algum equipamento cadastrado. Caso não seja localizado nenhum equipamento com o header no banco de dados, a conexão é encerrada e o handshake não é feito com o cliente por motivo de segurança.</p>

 ![enter image description here](https://ik.imagekit.io/rafaelsad/2020-08-12_12-43-23_KNMIm5u6yY.gif)

![enter image description here](https://ik.imagekit.io/rafaelsad/2020-08-12_12-44-07_PpReMSfWh.gif)

## :package: Endpoints

*Dentro da pasta raiz do projeto contém um arquivo 'Insomnia.json' com todos os endpoints configurados para importar no Insomnia.*

 **/api/v1/sessions (POST):** Autenticação do usuário
	Parametros no formato JSON: Email e password

![enter image description here](https://ik.imagekit.io/rafaelsad/auth_T7C1hwSYz.PNG)

***Rotas autenticadas***
 OBS: Todas as rotas devem passar o token como tipo Bearer.

 **/api/v1/location/:device_id (GET):** Localização atual do veículo

 ![enter image description here](https://ik.imagekit.io/rafaelsad/location_PoLOrXRKytQ.PNG)

**/api/v1/equipment/:device_id (GET):** Dados do equipamento

![enter image description here](https://ik.imagekit.io/rafaelsad/id_D7115X6YtDQ.PNG)

**/api/v1/equipment/my (GET):** Listagem de todos os equipamentos do usuário.
OBS: O id do usuário é identificado pelo token.

![enter image description here](https://ik.imagekit.io/rafaelsad/id_user_9XGpQLGIW0.PNG)


## :white_check_mark: Testes

Todos os serviços da aplicação foram testados e foi utilizada a biblioteca Jest.

Para rodar os testes basta rodar o comando:
```bash
  # Testes
  $ yarn test
```
<h1></h1>

<p align="center">Feito com ❤️ por Rafael Sad</p>
