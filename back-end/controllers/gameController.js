const { Bet, User, Game, Transaction } = require('../models');

// Simple helper to get random outcome
const randomBoolean = () => Math.random() < 0.5;

exports.placeBet = async (req, res) => {
  try {
    const { gameId, betAmount } = req.body;
    const user = req.user;

    if (user.role !== 'PLAYER') {
      return res.status(403).json({ message: 'Only PLAYER can place bets' });
    }

    // Check user balance
    if (user.chipsBalance < betAmount) {
      return res.status(400).json({ message: 'Insufficient chips to place bet' });
    }

    // Deduct bet amount from user
    user.chipsBalance -= betAmount;
    await user.save();

    // Create Bet record (initially PENDING)
    const bet = await Bet.create({
      userId: user.id,
      gameId,
      betAmount,
      result: 'PENDING'
    });

    // Dummy game logic: random outcome
    const isWin = randomBoolean(); // 50% chance
    let winAmount = 0;
    let result = 'LOSE';

    if (isWin) {
      // For example, you can double their bet
      winAmount = betAmount * 2;
      result = 'WIN';
      user.chipsBalance += winAmount;
      await user.save();

      // Record transaction for the winnings
      await Transaction.create({
        fromUserId: null, // from 'game'
        toUserId: user.id,
        amount: winAmount,
        transactionType: 'BET_WIN'
      });
    } else {
      // user lost, do nothing special
      // (the betAmount is already deducted)
      await Transaction.create({
        fromUserId: user.id,
        toUserId: null,
        amount: betAmount,
        transactionType: 'BET_LOSE'
      });
    }

    // Update bet outcome
    bet.result = result;
    bet.winAmount = winAmount;
    await bet.save();

    return res.json({
      message: 'Bet resolved',
      bet,
      currentBalance: user.chipsBalance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place bet' });
  }
};

exports.listGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    return res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to list games' });
  }
};
