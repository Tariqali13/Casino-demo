const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

// Protected register route (must have valid token from a parent user)
router.post('/register', verifyToken, register);

// Public login route
router.post('/login', login);

module.exports = router;
