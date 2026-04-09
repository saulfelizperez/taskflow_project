// frontend/app.js

// Detecta si estamos en producción (Vercel) o local
const API = window.location.hostname.includes('vercel.app')
  ? 'https://taskflow-project-l1d1.onrender.com/api/v1/tasks' // backend en Render
  : '/api/v1/tasks'; // proxy local

// Arreglo de tareas inicializado
let tasks = [];

// Obtener todas las tareas
export async function fetchTasks() {
  try {
    const res = await fetch(API);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Error al obtener tareas');
    }
    tasks = await res.json(); // actualiza el arreglo global
    return tasks;
  } catch (err) {
    console.error("Error fetchTasks:", err);
    alert("No se pudo obtener las tareas. Revisa la consola.");
    throw err;
  }
}

// Crear una nueva tarea
export async function createTask(title) {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Error al crear tarea');
    }
    const newTask = await res.json();
    tasks.push(newTask); // agrega la nueva tarea al arreglo
    return newTask;
  } catch (err) {
    console.error("Error createTask:", err);
    alert("No se pudo crear la tarea. Revisa la consola.");
    throw err;
  }
}

// Eliminar una tarea
export async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Error al eliminar tarea');
    }
    tasks = tasks.filter(task => task.id !== id); // actualiza arreglo
  } catch (err) {
    console.error("Error deleteTask:", err);
    alert("No se pudo eliminar la tarea. Revisa la consola.");
    throw err;
  }
}

// Actualizar tarea
export async function updateTask(id, updates) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Error al actualizar tarea');
    }
    const updatedTask = await res.json();
    tasks = tasks.map(task => task.id === id ? updatedTask : task); // actualiza arreglo
    return updatedTask;
  } catch (err) {
    console.error("Error updateTask:", err);
    alert("No se pudo actualizar la tarea. Revisa la consola.");
    throw err;
  }
}

// Función opcional para renderizar tareas en tu UI (si quieres)
export function renderTasks(renderCallback) {
  if (typeof renderCallback === 'function') {
    renderCallback(tasks);
  }
}