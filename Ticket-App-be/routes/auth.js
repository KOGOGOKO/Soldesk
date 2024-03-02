// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/login');
const { useRedis } = require('../middlewares/redis');
const { validateToken } = require('../middlewares/webtoken');

// 로그인
router.post('/login', authController.login);

module.exports = router;
