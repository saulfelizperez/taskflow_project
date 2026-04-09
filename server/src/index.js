const express = require("express");
const cors = require("cors");
const path = require("path");

// Importa Swagger
const { swaggerUi, swaggerSpec } = require("./docs/swagger.js");

// Importa rutas
const taskRoutes = require("./routes/task.routes");

const app = express();

// Puerto dinámico (CLAVE para Render)
const PORT = process.env.PORT || 3000;

// Middlewares generales
app.use(cors());
app.use(express.json());

// Montaje de rutas de la API
app.use("/api/v1/tasks", taskRoutes);

// Ruta de documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de ruta no encontrada (API)
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error(err);

  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  if (err.message === "TITLE_INVALID") {
    return res.status(400).json({ error: "Título inválido" });
  }

  if (err.message === "NO_FIELDS_TO_UPDATE") {
    return res.status(400).json({
      error: "Al menos un campo para actualizar es requerido",
    });
  }

  res.status(500).json({ error: "Error interno del servidor" });
});

// Servir frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// Arranca servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
