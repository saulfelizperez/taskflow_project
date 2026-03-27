const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const container = document.getElementById("task-container");

let tasks = [];

// Cargar tareas guardadas
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => createTask(task.text, task.priority));
  }
});

// Añadir tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  const newTask = {
    text: text,
    priority: tasks.length + 1
  };

  tasks.push(newTask);
  saveTasks();
  createTask(newTask.text, newTask.priority);

  input.value = "";
});

// Crear estructura visual igual a tu HTML
function createTask(text, priority) {

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const spanText = document.createElement("span");
  spanText.textContent = text;

  const badge = document.createElement("span");
  badge.classList.add("badge");
  badge.textContent = priority;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
    tasks = tasks.filter(t => t.text !== text);
    saveTasks();
  });

  taskDiv.appendChild(spanText);
  taskDiv.appendChild(badge);
  taskDiv.appendChild(deleteBtn);

  container.appendChild(taskDiv);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}