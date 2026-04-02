const service = require('../services/task.service');

function getTasks(req, res, next) {
  try {
    const tasks = service.obtenerTodas();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

function postTask(req, res, next) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'Título requerido' });
    }

    const task = service.crearTarea(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

function deleteTask(req, res, next) {
  try {
    service.eliminarTarea(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  postTask,
  deleteTask
};