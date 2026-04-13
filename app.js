// Detecta si estamos en producción (Vercel) o local
const API = window.location.hostname.includes("vercel.app")
  ? "https://taskflow-project-l1d1.onrender.com/api/v1/tasks"
  : "/api/v1/tasks";

// Estado global de tareas
let tasks = [];

// =========================
// GET TASKS
// =========================
export async function fetchTasks() {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al obtener tareas");
    }

    tasks = await res.json();
    return tasks;
  } catch (err) {
    console.error("Error fetchTasks:", err);
    alert("No se pudo obtener las tareas.");
    throw err;
  }
}

// =========================
// CREATE TASK
// =========================
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

    await res.json();

    // FIX: evitar estado duplicado → siempre sincronizar con backend
    await fetchTasks();

    return true;
  } catch (err) {
    console.error("Error createTask:", err);
    alert("No se pudo crear la tarea.");
    throw err;
  }
}

// =========================
// DELETE TASK
// =========================
export async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar tarea");
    }

    // FIX: sincronizar estado
    await fetchTasks();

    return true;
  } catch (err) {
    console.error("Error deleteTask:", err);
    alert("No se pudo eliminar la tarea.");
    throw err;
  }
}

// =========================
// UPDATE TASK
// =========================
export async function updateTask(id, updates) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al actualizar tarea");
    }

    await res.json();

    // FIX: sincronizar estado
    await fetchTasks();

    return true;
  } catch (err) {
    console.error("Error updateTask:", err);
    alert("No se pudo actualizar la tarea.");
    throw err;
  }
}

// =========================
// RENDER (opcional UI)
// =========================
export function renderTasks(callback) {
  if (typeof callback === "function") {
    callback(tasks);
  }
}
