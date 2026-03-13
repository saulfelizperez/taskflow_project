# Flujo de trabajo con Cursor

Este documento describe un flujo de trabajo práctico al utilizar Cursor: cómo se configura, cómo se integran herramientas externas y qué estrategias ayudan a optimizar el día a día con el editor.

## Atajos útiles

Dominar algunos atajos básicos marca una gran diferencia en la velocidad de trabajo:

- **Ctrl + L**: selecciona rápidamente la línea actual completa. Es muy útil para editar o eliminar bloques de código de forma ágil.
- **Ctrl + K**: abre el lanzador de comandos, desde donde puedes ejecutar acciones avanzadas y personalizables de Cursor sin quitar las manos del teclado.

Familiarizarse con estos y otros atajos aumenta notablemente la productividad, reduce tareas repetitivas y facilita la edición de código.

## Ejemplos de mejora de código

### 1. Dark mode (carga inicial del tema)

```html
<script>
  // Funcionalidad mejorada: carga el tema guardado de forma robusta
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
```

### 2. Task system + toggle de tema

```html
<script>
  /* ===== DARK MODE ===== */
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  /* ===== TASK SYSTEM ===== */
  // Encapsulado en una IIFE para limitar el scope global
  (function () {
    const input = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const list = document.getElementById("list");

    // Intentamos leer tareas desde localStorage con validación y fallback seguro
    let tasks;
    try {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      if (!Array.isArray(tasks)) tasks = null;
    } catch {
      tasks = null;
    }

    // Si no hay tareas guardadas, usamos las que ya están en el HTML
    if (!tasks || tasks.length === 0) {
      tasks = Array.from(list.children)
        .map((item) => {
          const span = item.querySelector("span");
          return span ? span.textContent.trim() : null;
        })
        .filter(Boolean);
      saveTasks();
    }

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render de la lista con estado vacío amigable
    function renderTasks() {
      list.innerHTML = "";

      if (!tasks || tasks.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className =
          "text-gray-400 dark:text-gray-500 py-6 text-center";
        emptyMsg.textContent = "No tasks found. Add your first topic!";
        list.appendChild(emptyMsg);
        return;
      }

      tasks.forEach((task, index) => {
        const item = document.createElement("div");
        item.className =
          "flex justify-between items-center p-4 bg-gray-200 dark:bg-slate-700 rounded-lg group transition hover:shadow";

        // Tooltip accesible y foco por teclado
        item.innerHTML = `
          <span tabindex="0" title="${task}">${task}</span>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-4 transition"
            type="button"
            aria-label="Delete ${task}"
            title="Delete"
          >
            Delete
          </button>
        `;

        const deleteBtn = item.querySelector("button");
        deleteBtn.addEventListener("click", () => {
          if (confirm(\`Delete "\${task}"?\`)) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
          }
        });

        list.appendChild(item);
      });
    }

    // Añadir tarea con validación y feedback visual
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

    // Eventos: botón y tecla Enter
    addButton.addEventListener("click", addTask);
    input.addEventListener("keypress", (e) => {
      if ((e.key === "Enter" || e.keyCode === 13) && !e.shiftKey) {
        addTask();
      }
    });

    // Mejor UX: enfocar el input al inicio
    window.addEventListener("DOMContentLoaded", () => input.focus());

    // Render inicial
    renderTasks();
  })();
</script>
```

## Proceso de instalación

### 1. Instalación de Cursor

1. Accede a la web oficial de **Anysphere**.
2. Descarga la última versión de **Cursor** para tu sistema operativo.
3. Instala el editor siguiendo el asistente.

### 2. Instalación del servidor MCP (filesystem)

En la consola integrada de Cursor, instala el servidor de filesystem:

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

### 3. Configuración del servidor en Cursor

1. Crea la carpeta **`.cursor`** en la raíz de tu proyecto (si no existe).
2. Dentro de **`.cursor`**, crea el archivo **`mcp.json`**.
3. Añade el siguiente contenido de configuración para el servidor MCP de filesystem:

```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "./"
      ]
    }
  }
}
```

4. Reinicia Cursor para que la configuración se cargue correctamente.
5. Prueba a hacer consultas internas sobre tu proyecto para comprobar que el servidor MCP funciona.

## Casos en los que Cursor es especialmente útil

- **1. Revisión de redacción y pequeños errores**  
  Cuando necesitas una segunda opinión sobre textos, mensajes de error o documentación, Cursor puede ayudarte a detectar fallos mínimos y mejorar la claridad.

- **2. Comprender y revisar proyectos existentes**  
  Si solo necesitas analizar la estructura de un proyecto y buscar posibles bugs o malas prácticas, Cursor puede ahorrar mucho tiempo encontrando patrones, archivos relevantes y zonas problemáticas.

- **3. Entender código de otras personas**  
  Al enfrentarte a código ajeno, Cursor puede explicar funciones, flujos y dependencias de forma resumida, incluso cuando el código tiene pocos o ningún comentario.

**Ejemplo**:  
Si el código tiene escasez de comentarios o una estructura poco clara, puedes pedir a Cursor una explicación paso a paso de un archivo o función concreta, para acelerar tu comprensión antes de realizar cambios.
