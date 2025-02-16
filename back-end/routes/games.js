const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const { placeBet, listGames } = require('../controllers/gameController');

router.get('/', verifyToken, listGames);
router.post('/bet', verifyToken, placeBet);

module.exports = router;
