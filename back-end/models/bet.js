const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bet = sequelize.define('Bet', {
    betAmount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    winAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    result: {
      type: DataTypes.ENUM('WIN', 'LOSE', 'PENDING'),
      defaultValue: 'PENDING'
    }
  });

  return Bet;
};
