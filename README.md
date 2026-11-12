# ONG-Alimentos

O projeto é dividido em duas partes:

- **back-end-api**: API REST desenvolvida com Java e Spring Boot.
- **front-end**: aplicação web/mobile desenvolvida com Expo e React Native.

## Requisitos

- Java 21
- Node.js e npm
- Android Studio ou Expo Go, caso queira executar no Android

## Executando o back-end

Abra um terminal na pasta do projeto e execute:

```bash
cd back-end-api
.\mvnw spring-boot:run
```

A API será iniciada em:

```text
http://localhost:8080
```

O banco de dados H2 é criado automaticamente na pasta `back-end-api/data`.

## Executando o front-end

Em outro terminal, a partir da raiz do projeto, execute:

```bash
cd front-end
npm install
npm start
```

Depois, escolha uma das opções exibidas pelo Expo:

- `w`: executar no navegador
- `a`: executar no Android
- escanear o QR Code pelo aplicativo Expo Go

Também é possível executar diretamente no navegador:

```bash
npm run web
```

Ou no Android:

```bash
npm run android
```

O front-end está configurado para acessar a API em:

```text
http://localhost:8080
```

Por isso, o back-end deve estar em execução antes de utilizar as funcionalidades que dependem da API.