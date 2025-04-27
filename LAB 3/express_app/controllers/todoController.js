const Todo = require('../models/todo');

exports.createTodo = async (req, res) => {
    try {
        const { userId, title, description, dueDate } = req.body;

        if (!userId || !title) {
            return res.status(400).json({ errors: ["userId and title are required."] });
        }

        const newTodo = new Todo({
            userId: userId,
            title: title,
            description: description,
            dueDate: dueDate
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};

exports.getUserTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.params.userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user todos', error });
    }
};

exports.getTodosWithLimitAndSkip = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const todos = await Todo.find().limit(limit).skip(skip);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};