---

# README BACKEND (server/README.md)

```md id="be2"
# TaskFlow Backend

Backend de TaskFlow encargado de gestionar la lógica de negocio y API REST.

---

## Tecnologías

- Node.js
- Express.js
- dotenv
- CORS
- Swagger

---

## Arquitectura

- Routes = endpoints
- Controllers = requests/responses
- Services = lógica de negocio
- Config = configuración del servidor
- Api = Metodos (Fetch) al server

---

## Estructura

server/

- controllers/
- services/
- routes/
- config/
- utils/
- swagger/
- index.js

---

## Instalación

```bash
- cd server
- npm install

env

- PORT=3000

--- Ejecución

- npm run dev

--- Servidor:

http://localhost:3000

--- API Endpoints
- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

--- Swagger
http://localhost:3000/api-docs

--- Funcionalidades

- CRUD completo
- API REST
- Arquitectura modular
- Swagger documentation


****Deploy****

*Render*
```
