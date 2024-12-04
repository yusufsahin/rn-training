const jsonServer = require('json-server');
const authMiddleware = require('./middleware/auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares
server.use(middlewares);

// Use body-parser for handling JSON requests
server.use(jsonServer.bodyParser);

// Login route (must be before auth middleware to bypass protection)
server.post('/login', (req, res) => {
  const jwt = require('jsonwebtoken');
  const SECRET = 'your-secret-key';
  const { username, password } = req.body;

  const db = router.db; // Access the lowdb instance
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Apply custom auth middleware to protect all routes after login
server.use(authMiddleware);

// Attach the JSON Server router
server.use(router);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
