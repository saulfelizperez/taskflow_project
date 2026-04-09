const API = 'http://localhost:3000/api/v1/tasks';

// Obtener todas las tareas
export async function fetchTasks() {
  const res = await fetch(API);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al obtener tareas');
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
    const error = await res.json();
    throw new Error(error.error || 'Error al crear tarea');
  }

  return res.json();
}

// Eliminar una tarea
export async function deleteTask(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al eliminar tarea');
  }
}

// 🔥 NUEVO (importante)
export async function updateTask(id, updates) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar tarea');
  }

  return res.json();
}