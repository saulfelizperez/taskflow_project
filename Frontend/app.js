import { fetchTasks, createTask, deleteTask } from "./api/client.js";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const container = document.getElementById("task-container");

// Cargar tareas desde API
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
  container.innerHTML = "Cargando...";

  try {
    const tasks = await fetchTasks();

    container.innerHTML = "";

    tasks.forEach((task) => {
      renderTask(task);
    });
  } catch (error) {
    container.innerHTML = "Error al cargar tareas";
  }
}

// Añadir tarea
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  try {
    await createTask(text);
    input.value = "";
    loadTasks(); // recargar lista
  } catch (error) {
    alert("Error al crear tarea");
  }
});

// Renderizar tarea
function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const spanText = document.createElement("span");
  spanText.textContent = task.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", async () => {
    try {
      await deleteTask(task.id);
      loadTasks();
    } catch (error) {
      alert("Error al eliminar tarea");
    }
  });

  taskDiv.appendChild(spanText);
  taskDiv.appendChild(deleteBtn);

  container.appendChild(taskDiv);
}
