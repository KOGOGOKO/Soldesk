const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Create user
router.post('/add', userController.signup);

// Get user
router.get('/:id?', userController.getUsers);

// Update user
router.patch('/edit/:id', userController.editUser); // 여기서 콜백 함수를 사용하여야 합니다.

// Delete user
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
