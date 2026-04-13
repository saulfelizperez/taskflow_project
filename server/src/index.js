require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Swagger
const { swaggerUi, swaggerSpec } = require("./docs/swagger.js");

// Rutas
const taskRoutes = require("./routes/task.routes");

const app = express();

// Puerto
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/v1/tasks", taskRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 API
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(" ERROR:", err);

  const statusCode = err.statusCode || 500;

  const message =
    statusCode === 500 ? "Error interno del servidor" : err.message;

  return res.status(statusCode).json({
    error: message,
  });
});

// Frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
