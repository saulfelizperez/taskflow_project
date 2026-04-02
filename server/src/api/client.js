const API = 'http://localhost:3000/api/v1/tasks';

export async function fetchTasks() {
  const res = await fetch(API);
  return res.json();
}

export async function createTask(title) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  if (!res.ok) throw new Error('Error al crear tarea');
}