const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllFirstNames);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id', userController.updateUser);

module.exports = router;