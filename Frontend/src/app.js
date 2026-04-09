import { fetchTasks, createTask, deleteTask } from "./api/client.js";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const container = document.getElementById("task-container");

// Cargar tareas desde API al inicio
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
  container.innerHTML = "Cargando...";

  try {
    const tasks = await fetchTasks();
    container.innerHTML = "";

    if (tasks.length === 0) {
      container.textContent = "There is no task yet";
      return;
    }

    tasks.forEach((task) => renderTask(task));
  } catch (error) {
    console.error(error);
    container.textContent = "Error loading tasks ";
  }
}

// Añadir tarea
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  try {
    // Crear tarea y recibir el objeto completo con id
    const newTask = await createTask(text);
    input.value = "";

    // Renderizar solo la nueva tarea sin recargar todo
    renderTask(newTask);
  } catch (error) {
    console.error(error);
    alert("Error creating tasks: " + error.message);
  }
});

// Renderizar tarea en el DOM
function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const spanText = document.createElement("span");
  spanText.textContent = task.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.marginLeft = "10px";

  // Eliminar tarea del DOM y backend
  deleteBtn.addEventListener("click", async () => {
    taskDiv.remove(); // se elimina inmediatamente del DOM

    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error(error);
      alert("Error deleting tasks: " + error.message);
      renderTask(task); // si falla, la volvemos a mostrar
    }
  });

  taskDiv.appendChild(spanText);
  taskDiv.appendChild(deleteBtn);

  container.appendChild(taskDiv);
}
