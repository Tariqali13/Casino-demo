const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Defines what roles can create which next-lower roles
const ROLE_HIERARCHY = {
  MASTER: ['MOTHER_COMPANY'],
  MOTHER_COMPANY: ['UPPER_RESELLER'],
  UPPER_RESELLER: ['RESELLER'],
  RESELLER: ['OPERATOR'],
  OPERATOR: ['PLAYER']
};

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const parentUser = req.user; 
    // For convenience, we assume you must be logged in, have certain role, etc.

    // Check if new role is allowed under the parent's role
    if (!ROLE_HIERARCHY[parentUser.role] || !ROLE_HIERARCHY[parentUser.role].includes(role)) {
      return res.status(403).json({ message: 'You cannot create this role' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      passwordHash,
      role,
      parentId: parentUser.id
    });

    return res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
