const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.post('/todos', todoController.createTodo);
router.patch('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.get('/users/:userId/todos', todoController.getUserTodos);
router.get('/todos', todoController.getTodosWithLimitAndSkip);

module.exports = router;