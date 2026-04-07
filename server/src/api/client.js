const API = 'http://localhost:3000/api/v1/tasks';

// Obtener todas las tareas
export async function fetchTasks() {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error('Error al obtener tareas');
  }

  return res.json();
}

// Crear una nueva tarea
export async function createTask(title) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  if (!res.ok) {
    throw new Error('Error al crear tarea');
  }

  return res.json();
}

// Eliminar una tarea
export async function deleteTask(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Error al eliminar tarea');
  }
}