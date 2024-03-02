const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Create user
router.post('/add', userController.createUser);

// Get user
router.get('/:id?', userController.getUsers);

// Update user
router.patch('/edit/:id', userController.editUser);

// Delete user
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
