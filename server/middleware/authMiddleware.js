// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Correct: your token contains { id: user._id }
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
