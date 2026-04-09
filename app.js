// Detecta si estamos en producción (Vercel) o local
const API = window.location.hostname.includes("vercel.app")
  ? "https://taskflow-project-l1d1.onrender.com/api/v1/tasks" // tu backend en Render
  : "/api/v1/tasks"; // proxy local

// Obtener todas las tareas
export async function fetchTasks() {
  try {
    const res = await fetch(API);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al obtener tareas");
    }
    return res.json();
  } catch (err) {
    console.error("Error fetchTasks:", err);
    throw err;
  }
}

// Crear una nueva tarea
export async function createTask(title) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al crear tarea");
    }
    return res.json();
  } catch (err) {
    console.error("Error createTask:", err);
    throw err;
  }
}

// Eliminar una tarea
export async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar tarea");
    }
  } catch (err) {
    console.error("Error deleteTask:", err);
    throw err;
  }
}

// Actualizar tarea
export async function updateTask(id, updates) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al actualizar tarea");
    }
    return res.json();
  } catch (err) {
    console.error("Error updateTask:", err);
    throw err;
  }
}
