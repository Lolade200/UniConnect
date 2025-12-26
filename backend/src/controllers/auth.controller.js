const { User } = require('../models');   // import your User model
const bcrypt = require('bcrypt');        // import bcrypt
const jwt = require('jsonwebtoken');     // import JWT

// Register function
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Registration error:', err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(400).json({ error: 'Database error: ' + err.message });
    }

    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Login function with JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },   // payload
      process.env.JWT_SECRET,               // secret key from .env
      { expiresIn: '1h' }                   // token expiry
    );

    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
