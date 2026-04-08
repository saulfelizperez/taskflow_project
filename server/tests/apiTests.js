const fetch = require("node-fetch");

const BASE_URL = "http://localhost:3000/api/v1"; // Cambia al puerto donde está tu servidor TaskFlow

let taskIds = []; // Guardamos IDs de tareas creadas

// --------------------- FUNCIONES DE TEST ---------------------

// Crear tarea
async function createTask(title = "Tarea de prueba") {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });

    const text = await response.text();
    console.log("RESPUESTA RAW POST:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(" POST no devolvió JSON válido");
      return null;
    }

    if (!data.id) {
      console.error(" POST falló, no hay id:", data);
      return null;
    }

    console.log(" POST OK:", data);
    taskIds.push(data.id);
    return data.id;
  } catch (err) {
    console.error(" Error al hacer POST:", err);
    return null;
  }
}

// Leer tarea
async function getTask(id) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(" GET no devolvió JSON válido:", text);
      return null;
    }

    console.log(" GET OK:", data);
    return data;
  } catch (err) {
    console.error(" Error GET:", err);
    return null;
  }
}

// Actualizar tarea
async function updateTask(id, updates = { completed: true }) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(" PUT no devolvió JSON válido:", text);
      return null;
    }

    console.log("✏️ PUT OK:", data);
    return data;
  } catch (err) {
    console.error(" Error PUT:", err);
    return null;
  }
}

// Borrar tarea
async function deleteTask(id) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    console.log("🗑 DELETE status:", response.status, `id borrado: ${id}`);
  } catch (err) {
    console.error(" Error DELETE:", err);
  }
}

// --------------------- EJECUTAR TESTS ---------------------

async function runTests() {
  console.log("=== INICIANDO PRUEBAS TASKFLOW ===");

  // Crear tareas
  const id1 = await createTask("Tarea Test 1");
  const id2 = await createTask("Tarea Test 2");

  if (!id1 || !id2) {
    console.error(" No se pudieron crear todas las tareas, abortando tests.");
    return;
  }

  // Leer tareas
  await getTask(id1);
  await getTask(id2);

  // Actualizar primera tarea
  await updateTask(id1, { completed: true });

  // Leer de nuevo para verificar actualización
  await getTask(id1);

  // Borrar tareas
  await deleteTask(id1);
  await deleteTask(id2);

  console.log("=== PRUEBAS COMPLETADAS ===");
}

// Ejecutar todo
runTests();
