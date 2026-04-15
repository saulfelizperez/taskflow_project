# 📌 TaskFlow

TaskFlow es una aplicación full-stack de gestión de tareas que permite crear, editar, eliminar y visualizar tareas mediante una API REST y un frontend conectado.

---

## Documentación del proyecto

- [Doc del Backend](./docs/categorias/bnd&Fnd/README_backend.md)
- [Doc del Frontend](./docs/categorias/bnd&Fnd/README_frontend.md)
- [Doc de pruebas generales](./docs/categorias/bnd&Fnd/pruebas_generales.md)

## Stack tecnológico

- Node.js + Express
- HTML, CSS, JavaScript (Vanilla)
- Swagger (API documentation)

---

## Estructura del proyecto

-TaskFlow
server/
frontend/

README.md

---

## Ejecución del proyecto

### Backend

- [Doc del Backend](./docs/categorias/bnd&Fnd/README_backend.md)

- cd server
- npm install
- npm run dev

### Frontend

- [Doc del Frontend](./docs/categorias/bnd&Fnd/README_frontend.md)

- Abrir:

frontend/index.html

--- API
http://localhost:3000/api/v1

--- Swagger
http://localhost:3000/api-docs

```bash

--- Funcionalidades

- Crear tareas
- Listar tareas
- Editar tareas
- Eliminar tareas
- Variedad de listas
- API REST estructurada
- Arquitectura modular
- Documentación Swagger
- Frontend dinámico sin recarga
- Separación frontend/backend
- Preferencia entre Modo Oscuro/Modo Claro

--- Futuras mejoras

- Filtro de tareas
- Test automaticos


------  Autor

- Desarrollado como Proyecto full-stack de practica

--- Explicacion de los middlewares


-- Middleware CORS (1) --

*app.use(cors());*

- Es un middleware que se encarga de gestionar las restricciones de origen entre cliente y servidor.

- En la práctica, configura las reglas que permiten que tu backend pueda recibir   peticiones desde otros dominios o puertos distintos al suyo.

- Básicamente, añade automáticamente cabeceras HTTP que controlan qué orígenes están autorizados a acceder a la API.


-- Middleware de parsing (2) --

*app.use(express.json());*

- Este middleware se encarga de leer el cuerpo de las peticiones HTTP y convertirlo de JSON a objeto JavaScript.

- Cuando el cliente envía datos en formato JSON, este middleware los interpreta y los deja disponibles en req.body.

- Sin él, el servidor no podría entender los datos enviados en el body.


-- Middleware 404 → Route fallback (3) --

*app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});*

- Este middleware funciona como un controlador de respaldo para rutas inexistentes.

- Se ejecuta únicamente cuando ninguna de las rutas definidas anteriormente coincide con la petición.

- En ese caso, responde con un error 404 indicando que el endpoint no existe.


-- Middleware de errores → Error handler (4) --

*app.use((err, req, res, next) => {*

- Este es un middleware especializado en capturar y gestionar errores dentro del flujo de la aplicación.

- Cuando ocurre un error en cualquier parte del backend y se lanza con throw o next(err), este middleware lo intercepta.

- Su función es transformar esos errores en respuestas HTTP estructuradas, normalmente con un código de estado adecuado y un mensaje legible.

- También actúa como un punto central donde se unifican todos los errores del sistema.

```

--- Ejemplos de interaccion con la API REST

- [Doc de pruebas generales](./docs/categorias/bnd&Fnd/pruebas_generales.md)

_Deploy_

<a href: "https://taskflowproject-blue.vercel.app" > Enlace para entrar al proyecto <a>
