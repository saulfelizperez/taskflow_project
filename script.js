// THEME SYSTEM

// Carga tema guardado o preferencia del sistema
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
}

function toggleTheme() {
  const html = document.documentElement;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// TASK ADD SYSTEM

const input = document.querySelector("input");
const listContainer = document.querySelector(".space-y-4");
const addButton = document.querySelector("button.bg-blue-600");

addButton.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  const newItem = document.createElement("div");

  newItem.className =
    "flex justify-between items-center bg-gray-200 dark:bg-slate-700 p-4 rounded-lg mt-2";

  newItem.innerHTML = `
    <span>${text}</span>
    <span class="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full">•</span>
  `;

  listContainer.appendChild(newItem);
  input.value = "";
});
