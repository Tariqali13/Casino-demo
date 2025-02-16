const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const { transferChips, getTransactions } = require('../controllers/transactionController');

router.post('/transfer', verifyToken, transferChips);
router.get('/', verifyToken, getTransactions);

module.exports = router;
