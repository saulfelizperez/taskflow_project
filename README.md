# Trading Website

Small practice project developed in DAM to experiment with a trading–themed interface, dark mode, and basic task management in the browser.

---

## 🛠 Technologies Used

- **HTML** – Structure and layout of the single–page app.
- **Tailwind CSS** – Styling and responsive design (`src/styles.css` → `dist/styles.css`).
- **JavaScript (vanilla)** – Dark mode toggle and a simple task system with `localStorage`.

---

## ✨ Features

### Trading Dashboard Layout

- Sidebar with indices and tools (NAS100, SP500, DOW JONES, IBEX 35).
- Main content area for tasks, topics, and psicotrading tips.

### Task / Topic Management

- Add new tasks/items from the input (“Write a new index”).
- Persist tasks in `localStorage` so they survive page reloads.
- Delete individual tasks with a button and confirmation.
- Edit task titles directly in the interface.
- Filter tasks by **all / pending / completed**.
- Search tasks by text.
- Complete all tasks with a single button.
- Delete all completed tasks (recently added feature).

### Dark Mode

- Automatic detection of system preference.
- Manual toggle via floating button.
- Smooth transition between light and dark themes.

---

## 🚀 Getting Started

### Requirements

- **Node.js**
- **npm** (comes with Node)

### Installation

```bash
    npm install


### Project usage

 People who already are verified can add different tasks about good trading practices
```
