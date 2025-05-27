const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let todos = [];
let nextId = 1;

const findTodoById = (id) => {
  return todos.find(todo => todo.id === parseInt(id));
};

app.get('/todos', (req, res) => {
  const { limit = 10, skip = 0 } = req.query;
  const start = parseInt(skip);
  const end = start + parseInt(limit);
  const paginatedTodos = todos.slice(start, end).map(({ id, title, status }) => ({ id, title, status }));
  res.json(paginatedTodos);
});

app.get('/todos/:id', (req, res) => {
  const todo = findTodoById(req.params.id);
  if (todo) {
    res.json({ id: todo.id, title: todo.title, status: todo.status });
  } else {
    res.status(404).send('Todo not found');
  }
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send('Title is required');
  }
  const newTodo = {
    id: nextId++,
    title: title,
    status: 'new',
  };
  todos.push(newTodo);
  res.status(201).json({ id: newTodo.id, title: newTodo.title, status: newTodo.status });
});

app.delete('/todos/:id', (req, res) => {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  if (todos.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Todo not found');
  }
});

app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, status } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex !== -1) {
    if (title) {
      todos[todoIndex].title = title;
    }
    if (status && ['new', 'inProgress', 'done'].includes(status)) {
      todos[todoIndex].status = status;
    } else if (status) {
      return res.status(400).send('Invalid status. Must be "new", "inProgress", or "done".');
    }
    res.json({ id: todos[todoIndex].id, title: todos[todoIndex].title, status: todos[todoIndex].status });
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});