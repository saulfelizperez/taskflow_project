const service = require("../services/task.service");

// GET
function getTasks(req, res) {
  const tasks = service.obtenerTodas();
  res.json(tasks);
}

// POST
function createTask(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const task = service.crearTarea({ title });

  return res.status(201).json(task);
}

// DELETE
function deleteTask(req, res) {
  const { id } = req.params;

  service.eliminarTarea(id);

  return res.sendStatus(204);
}

// PATCH
function updateTask(req, res) {
  const { id } = req.params;

  const task = service.actualizarTarea(id, req.body);

  return res.json(task);
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};