const service = require("../services/task.service");

// GET
function getTasks(req, res, next) {
  try {
    const tasks = service.obtenerTodas();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

// POST
function postTask(req, res, next) {
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      return res.status(400).json({
        error: "TITLE_INVALID",
      });
    }

    const task = service.crearTarea(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// DELETE
function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID_REQUIRED",
      });
    }

    service.eliminarTarea(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// PUT
function putTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID_REQUIRED",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "NO_FIELDS_TO_UPDATE",
      });
    }

    const updatedTask = service.actualizarTarea(id, req.body);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  postTask,
  deleteTask,
  putTask,
};