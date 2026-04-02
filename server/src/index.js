// index.js
const express = require('express');
const cors = require('cors');

// Configuracion de variables de entorno
const { PORT } = require('./config/env');

// Importa Swagger
const { swaggerUi, swaggerSpec } = require('./docs/swagger.js');

// Importa rutas
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/v1/tasks', taskRoutes);

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Arranca servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const path = require('path');

// Sirve archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Ruta raíz: siempre devuelve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});