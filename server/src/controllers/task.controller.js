const service = require('../services/task.service');

function getTasks(req, res, next) {
  try {
    const tasks = service.obtenerTodas();
    res.status(200).json(tasks);
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
    next(err); // 🔥 delegamos al middleware global
  }
}

function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    service.eliminarTarea(id);
    res.status(204).send();

  } catch (err) {
    next(err);
  }
}

function putTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    const updatedTask = service.actualizarTarea(id, req.body);
    res.status(200).json(updatedTask);

  } catch (err) {
    next(err); // 🔥 TODO al middleware global
  }
}

module.exports = {
  getTasks,
  postTask,
  deleteTask,
  putTask
};