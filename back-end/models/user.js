const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(
        'MASTER',
        'MOTHER_COMPANY',
        'UPPER_RESELLER',
        'RESELLER',
        'OPERATOR',
        'PLAYER'
      ),
      allowNull: false
    },
    chipsBalance: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    // NEW: to hold any profit/commission from selling chips
    commissionBalance: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return User;
};
