# Flujo de trabajo con Cursor

## Documentación

Este documento describe el flujo de trabajo al utilizar Cursor, incluyendo cómo se configura, se integran herramientas y se optimizan procesos. Se detallarán pasos, estrategias y trucos para mejorar la eficiencia.

### Atajos

Sin duda el atajo **Ctrl + L** es el que más uso, ya que permite seleccionar rápidamente una línea completa, lo cual es muy útil para editar o eliminar secciones de código de manera ágil. Además, el atajo **Ctrl + K** también resulta muy práctico, especialmente para ejecutar comandos específicos relacionados con funcionalidades avanzadas y personalizables de Cursor. Recomiendo familiarizarse con estos y otros atajos, ya que optimizan considerablemente el flujo de trabajo y la productividad en el editor, permitiendo realizar tareas repetitivas o complejas de forma mucho más eficiente.

***Ejemplos de mejoria de codigo***

_1)_ Dark Mode

<script>
      // ⬛ Mejorado: Funcionalidad para cargar tema guardado de manera más robusta
      (function () {
        const userTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (userTheme === "dark" || (!userTheme && prefersDark)) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      })();
    </script>

_2)_ Task System

<script>
      /* ===== DARK MODE ===== */
      function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      }
      /* ===== TASK SYSTEM ===== */
      // ⬛ Mejorado: Encapsulado en IIFE para limitar el scope global
      (function () {
        const input = document.getElementById("taskInput");
        const addButton = document.getElementById("addButton");
        const list = document.getElementById("list");
        // Mejoras: validación de localStorage, safe fallback, y cifra de tareas únicas (opc)
        // Leer tareas desde localStorage
        let tasks;
        try {
          tasks = JSON.parse(localStorage.getItem("tasks"));
          if (!Array.isArray(tasks)) tasks = null;
        } catch (e) {
          tasks = null;
        }
        // Si no hay tareas guardadas, tomar las que ya están en el HTML (mejora: único por texto)
        if (!tasks || tasks.length === 0) {
          tasks = Array.from(list.children)
            .map((item) => {
              const span = item.querySelector("span");
              return span ? span.textContent.trim() : null;
            })
            .filter(Boolean);
          saveTasks();
        }
        // Guardar tareas en localStorage
        function saveTasks() {
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        // Mejoras en render
        function renderTasks() {
          list.innerHTML = "";
          if (!tasks || tasks.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.className = "text-gray-400 dark:text-gray-500 py-6 text-center";
            emptyMsg.textContent = "No tasks found. Add your first topic!";
            list.appendChild(emptyMsg);
            return;
          }
          tasks.forEach((task, index) => {
            const item = document.createElement("div");
            item.className =
              "flex justify-between items-center p-4 bg-gray-200 dark:bg-slate-700 rounded-lg group transition hover:shadow";
            // Mejorado: añade tooltip accesible y tabindex
            item.innerHTML = `
              <span tabindex="0" title="${task}">${task}</span>
              <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-4 transition"
                type="button" aria-label="Delete ${task}" title="Delete">
                Delete
              </button>
            `;
            const deleteBtn = item.querySelector("button");
            deleteBtn.addEventListener("click", () => {
              // Confirmación opcional para evitar borrar sin querer
              if (confirm(`Delete "${task}"?`)) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
              }
            });
            list.appendChild(item);
          });
        }
        // Añadir tarea - validación única y longitud mínima
        function addTask() {
          const text = input.value.trim();
          if (!text) {
            input.classList.add("border-red-500");
            input.placeholder = "Please enter something!";
            setTimeout(() => {
              input.classList.remove("border-red-500");
              input.placeholder = "Write a new index";
            }, 1400);
            return;
          }
          if (tasks.includes(text)) {
            input.classList.add("border-yellow-500");
            input.value = "";
            input.placeholder = "Already exists!";
            setTimeout(() => {
              input.classList.remove("border-yellow-500");
              input.placeholder = "Write a new index";
            }, 1400);
            return;
          }
          tasks.push(text);
          saveTasks();
          renderTasks();
          input.value = "";
        }
        // Evento click y enter para añadir tarea
        addButton.addEventListener("click", addTask);
        input.addEventListener("keypress", (e) => {
          if ((e.key === "Enter" || e.keyCode === 13) && !e.shiftKey) {
            addTask();
          }
        });
        // Mejor UX: enfocar input al inicio
        window.addEventListener("DOMContentLoaded", () => input.focus());
        // Render inicial
        renderTasks();
      })();
    </script>


## Proceso de instalacion

### 1. Instalacion de Cursor

Accedi a la web oficial **Anysphere** y descarge la ultima version de **Cursor**.

### 2. Instalacion del servidor MCP

Simplemente utilize este "**npm install -g @modelcontextprotocol/server-filesystem**" comando en la consola de cursor.

### 3. Configuracion del servidor en Cursor

--- Cree 
