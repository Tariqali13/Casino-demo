const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Game = sequelize.define('Game', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Game;
};
