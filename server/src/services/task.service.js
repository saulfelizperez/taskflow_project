let tasks = []; // "base de datos" en memoria

// Obtener todas las tareas
function obtenerTodas() {
  return tasks;
}

// Crear una nueva tarea
function crearTarea({ title }) {
  if (!title || typeof title !== "string") {
    throw new Error("TITLE_INVALID");
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
    throw new Error("NOT_FOUND");
  }

  tasks = tasks.filter((task) => task.id !== id);
}

// Actualizar una tarea
function actualizarTarea(id, updates) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error("NOT_FOUND");
  }

  if (!updates || Object.keys(updates).length === 0) {
    throw new Error("NO_FIELDS_TO_UPDATE");
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
