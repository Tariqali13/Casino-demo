const express = require('express');
const router = express.Router();
const { getMyProfile, getChildren } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

router.get('/me', verifyToken, getMyProfile);
router.get('/children', verifyToken, getChildren);

module.exports = router;
