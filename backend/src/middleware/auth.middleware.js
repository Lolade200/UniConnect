// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Support both "id" and "userId" in payload
    req.userId = decoded.id || decoded.userId;

    if (!req.userId) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
