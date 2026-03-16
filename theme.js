// Inicializa el tema al cargar según preferencia guardada o del sistema
(function () {
  const userTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark =
    userTheme === "dark" || (!userTheme && prefersDark);

  document.documentElement.classList.toggle("dark", isDark);
  updateThemeButton(isDark);
})();

// Alterna entre modo claro y oscuro y guarda la preferencia
function toggleTheme() {
  const htmlElement = document.documentElement;
  const isDarkModeEnabled = htmlElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkModeEnabled ? "dark" : "light");
  updateThemeButton(isDarkModeEnabled);
}

// Actualiza el texto del botón según el modo
function updateThemeButton(isDark) {
  const button = document.getElementById("themeToggleButton");
  if (!button) return;

  button.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}
