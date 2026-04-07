const service = require('../services/task.service');

/**
 * GET /tasks
 */
function getTasks(req, res, next) {
  try {
    const tasks = service.obtenerTodas();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /tasks
 */
function postTask(req, res, next) {
  try {
    const { title } = req.body;

    // Validaciones
    if (!title) return res.status(400).json({ error: 'Título requerido' });
    if (typeof title !== 'string') return res.status(400).json({ error: 'Título debe ser texto' });
    if (title.length > 100) return res.status(400).json({ error: 'Título demasiado largo (máx 100 caracteres)' });

    const task = service.crearTarea({ title });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /tasks/:id
 */
function putTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!title && completed === undefined) {
      return res.status(400).json({ error: 'Al menos un campo para actualizar es requerido' });
    }

    if (title && typeof title !== 'string') {
      return res.status(400).json({ error: 'Título debe ser texto' });
    }

    const task = service.actualizarTarea(id, { title, completed });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /tasks/:id
 */
function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID requerido' });

    service.eliminarTarea(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
};