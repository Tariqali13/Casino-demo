const { User } = require('../models');

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['passwordHash'] }
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get profile' });
  }
};

exports.getChildren = async (req, res) => {
  try {
    // List immediate children of the logged in user
    const children = await User.findAll({ where: { parentId: req.user.id } });
    res.json(children);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get sub-accounts' });
  }
};
