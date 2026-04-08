let tasks = [];

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  if (!data.title || typeof data.title !== 'string') {
    throw new Error('TITLE_INVALID'); // Error controlado
  }

  const newTask = {
    id: Date.now().toString(), // ID único basado en timestamp
    title: data.title,
    completed: false
  };

  tasks.push(newTask);
  return newTask;
}

function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND'); // Error 404 controlado
  }
  tasks.splice(index, 1);
}

function actualizarTarea(id, data) {
  const task = tasks.find(t => t.id === id);
  if (!task) {
    throw new Error('NOT_FOUND');
  }

  if (!data.title && data.completed === undefined) {
    throw new Error('NO_FIELDS_TO_UPDATE');
  }

  if (data.title) task.title = data.title;
  if (data.completed !== undefined) task.completed = data.completed;

  return task;
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea
};