const fetch = require("node-fetch"); // opcional si Node < 18

const BASE_URL = "http://localhost:3000/api/v1";

let taskIds = [];

// Crear tarea
async function createTask(title = "Tarea de prueba") {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });

  const data = await response.json();

  console.log("POST OK:", data);

  if (data.id) taskIds.push(data.id);

  return data.id;
}

// Leer tarea
async function getTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  const data = await response.json();

  console.log("GET OK:", data);
  return data;
}

// Actualizar tarea
async function updateTask(id, updates = { completed: true }) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  console.log("PUT OK:", data);
  return data;
}

// Borrar tarea
async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);

  console.log("DELETE status:", response.status, id);
}

// Run tests
async function runTests() {
  console.log("=== INICIANDO TESTS TASKFLOW ===");

  const id1 = await createTask("Tarea Test 1");
  const id2 = await createTask("Tarea Test 2");

  await getTask(id1);
  await getTask(id2);

  await updateTask(id1, { completed: true });

  await getTask(id1);

  await deleteTask(id1);
  await deleteTask(id2);

  console.log("=== TESTS COMPLETADOS ===");
}

runTests();