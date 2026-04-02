const express = require('express');
const controller = require('../controllers/task.controller');

const router = express.Router();

router.get('/', controller.getTasks);
router.post('/', controller.postTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;