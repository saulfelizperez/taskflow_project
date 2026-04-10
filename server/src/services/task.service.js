const AppError = require("../utils/appError");

let tasks = []; // "base de datos" en memoria

// Obtener todas las tareas
function obtenerTodas() {
  return tasks;
}

// Crear una nueva tarea
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

// Eliminar una tarea
function eliminarTarea(id) {
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    throw new AppError("NOT_FOUND", 404);
  }

  tasks = tasks.filter((task) => task.id !== id);
}

// Actualizar una tarea
function actualizarTarea(id, updates) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new AppError("NOT_FOUND", 404);
  }

  if (!updates || Object.keys(updates).length === 0) {
    throw new AppError("NO_FIELDS_TO_UPDATE", 400);
  }

  const updatedTask = {
    ...tasks[index],
    ...updates,
  };

  tasks[index] = updatedTask;
  return updatedTask;
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};