let tasks = [];

/**
 * Obtener todas las tareas
 */
function obtenerTodas() {
  return tasks;
}

/**
 * Crear una nueva tarea
 */
function crearTarea({ title }) {
  const task = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  tasks.push(task);
  return task;
}

/**
 * Eliminar tarea por ID
 */
function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
}

/**
 * Actualizar tarea por ID (PUT)
 */
function actualizarTarea(id, data) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('NOT_FOUND');
  Object.assign(task, data);
  return task;
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};