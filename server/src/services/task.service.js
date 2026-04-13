const AppError = require("../utils/appError");

let tasks = [];

// Obtener todas
function obtenerTodas() {
  return tasks;
}

// Crear tarea
function crearTarea({ title }) {
  if (!title || typeof title !== "string") {
    throw new AppError("TITLE_INVALID", 400);
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  return newTask;
}

// Eliminar tarea
function eliminarTarea(id) {
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    throw new AppError("NOT_FOUND", 404);
  }

  tasks = tasks.filter((task) => task.id !== id);
}

// Actualizar tarea
function actualizarTarea(id, updates) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new AppError("NOT_FOUND", 404);
  }

  if (!updates || Object.keys(updates).length === 0) {
    throw new AppError("NO_FIELDS_TO_UPDATE", 400);
  }

  tasks[index] = {
    ...tasks[index],
    ...updates,
  };

  return tasks[index];
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};