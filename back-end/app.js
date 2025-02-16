require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const gameRoutes = require('./routes/games');
const { User } = require('./models');
const { Game } = require('./models');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/games', gameRoutes);

const PORT = process.env.PORT || 4000;

// Sync DB (use force: false in production!)
sequelize.sync({ alter: true }).then(async () => {
  // Check if there's already a MASTER user
  const masterUser = await User.findOne({ where: { role: 'MASTER' } });
  const anyGame = await Game.findOne();
  if (!masterUser) {
    // create one
    const passwordHash = await bcrypt.hash('master', 10);
    await User.create({
      username: 'master',
      passwordHash,
      role: 'MASTER',
    });
    console.log('MASTER user created: master / master');
  }

  if (anyGame == null) {
    await Game.create({
      name: 'test game1',
    });
    await Game.create({
      name: 'test game2',
    });
  }

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
