// Detecta entorno (local vs producción)
const API = window.location.hostname.includes("vercel.app")
  ? "https://taskflow-project-l1d1.onrender.com/api/v1/tasks"
  : "/api/v1/tasks";

// =========================
// GET TASKS
// =========================
export async function fetchTasks() {
  const res = await fetch(API);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener tareas");
  }

  return res.json();
}

// =========================
// CREATE TASK
// =========================
export async function createTask(title) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear tarea");
  }

  return res.json();
}

// =========================
// DELETE TASK
// =========================
export async function deleteTask(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  // 204 NO CONTENT → no siempre hay JSON
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Error al eliminar tarea");
  }

  return true;
}

// =========================
// UPDATE TASK (PATCH)
// =========================
export async function updateTask(id, updates) {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar tarea");
  }

  return res.json();
}
