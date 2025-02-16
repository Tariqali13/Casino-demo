const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    // Example transactionType: 'TRANSFER', 'BET_WIN', 'BET_LOSE', 'PURCHASE'
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Transaction;
};
