// transactionController.js
const { User, Transaction } = require('../models');

// For this example, let's say each seller charges a 10% commission
// on the number of chips sold. The seller gets that 10% as profit.
const COMMISSION_PERCENT = 0.1;

exports.transferChips = async (req, res) => {
  try {
    const { toUserId, amount } = req.body;
    const fromUser = req.user; // The seller

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Find the buyer
    const toUser = await User.findByPk(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Confirm parent->child relationship
    if (toUser.parentId !== fromUser.id) {
      return res.status(403).json({ message: 'Not your direct child' });
    }

    // If fromUser is MASTER, skip chip balance check => unlimited supply
    let commissionFee = amount * COMMISSION_PERCENT;

    // 1) Deduct from the seller's chips if NOT master
    if (fromUser.role !== 'MASTER') {
      if (fromUser.chipsBalance < amount) {
        return res.status(400).json({ message: 'Seller has insufficient chips' });
      }
      fromUser.chipsBalance -= amount;
    }

    // 2) Buyer receives the chips in their chipsBalance
    toUser.chipsBalance += amount;
    await toUser.save();

    // 3) Commission logic
    // The seller's profit is 'commissionFee'. We store that in commissionBalance
    fromUser.commissionBalance += commissionFee;
    await fromUser.save();

    // 4) Log the main transfer
    await Transaction.create({
      fromUserId: fromUser.id,
      toUserId: toUser.id,
      amount,
      transactionType: 'TRANSFER'
    });

    // 5) Log the commission (optional, but recommended)
    await Transaction.create({
      fromUserId: toUser.id, // or fromUser.id if you want to reflect it's "earned by fromUser"
      toUserId: fromUser.id,
      amount: commissionFee,
      transactionType: 'COMMISSION'
    });

    return res.json({
      message: 'Chips transferred successfully',
      commissionEarned: commissionFee
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to transfer chips' });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    // Return transactions for the logged in user
    const transactions = await Transaction.findAll({
      where: {
        // where either fromUserId or toUserId is the user
      }
    });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get transactions' });
  }
};
