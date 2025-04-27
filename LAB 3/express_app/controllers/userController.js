const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'An error occurred while creating the user', error });
    }
};

exports.getAllFirstNames = async (req, res) => {
    try {
        const users = await User.find({}, 'firstName');
        const firstNames = users.map(user => user.firstName);
        res.status(200).json(firstNames);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching user first names', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'An error occurred while updating the user', error });
    }
};