const sequelize = require('../config/db');
const User = require('./user')(sequelize);
const Transaction = require('./transaction')(sequelize);
const Bet = require('./bet')(sequelize);
const Game = require('./game')(sequelize);

// Associations
// A User can have many children (sub-accounts). For convenience, we store parentId in User.
User.hasMany(User, { as: 'children', foreignKey: 'parentId' });
User.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });

// A User can have many transactions (either as sender or receiver)
User.hasMany(Transaction, { as: 'sentTransactions', foreignKey: 'fromUserId' });
User.hasMany(Transaction, { as: 'receivedTransactions', foreignKey: 'toUserId' });

// Transaction belongs to fromUser and toUser
Transaction.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUserId' });
Transaction.belongsTo(User, { as: 'toUser', foreignKey: 'toUserId' });

// Bets
User.hasMany(Bet, { foreignKey: 'userId' });
Bet.belongsTo(User, { foreignKey: 'userId' });

Game.hasMany(Bet, { foreignKey: 'gameId' });
Bet.belongsTo(Game, { foreignKey: 'gameId' });

// Export models
module.exports = {
  sequelize,
  User,
  Transaction,
  Bet,
  Game
};
