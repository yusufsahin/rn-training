const jwt = require('jsonwebtoken');
const SECRET = 'your-secret-key';

module.exports = (req, res, next) => {
  // Bypass auth for the login route
  if (req.path === '/login') {
    return next();
  }

  // Require Authorization header for other routes
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
