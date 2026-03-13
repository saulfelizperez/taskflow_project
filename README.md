# Trading Website

Small practice project developed in DAM to experiment with a trading–themed interface, dark mode and basic task management in the browser.

## Technologies used

- **HTML** – Structure and layout of the single–page app.
- **Tailwind CSS** – Styling and responsive design (`src/styles.css` → `dist/styles.css`).
- **JavaScript (vanilla)** – Dark mode toggle and a simple task system with `localStorage`.

## Features

- **Trading dashboard layout**: Sidebar with indices and tools (NAS100, SP500, etc.) and a main content area.
- **Task / topic management**:
  - Add new items from the input (“Write a new index”).
  - Persist tasks in `localStorage` so they survive page reloads.
  - Delete existing tasks with a button and confirmation.
- **Dark mode**:
  - Automatic detection of system preference.
  - Manual toggle via floating button.

## Getting started

### Requirements

- **Node.js** 
- **npm** (comes with Node)

### Installation

```bash
npm install
```

### Run Tailwind in watch mode

This compiles `src/styles.css` into `dist/styles.css` and watches for changes:

```bash
npm run dev
```

Then open `index.html` directly in your browser (or with a simple static server / Live Server extension).

## Project structure (simplified)

- `index.html` – Main page, layout, and embedded JavaScript.
- `src/styles.css` – Tailwind entry file.
- `dist/styles.css` – Generated CSS (output of Tailwind).
- `docs/ai/` – Personal notes and experiments with different AIs and prompt engineering.

## Notes

This project is meant for learning and experimentation, not for production use.  
Feel free to extend it with more trading widgets, better accessibility, or by extracting the JavaScript into separate modules.
