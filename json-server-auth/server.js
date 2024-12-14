const jsonServer = require('json-server');
const authMiddleware = require('./middleware/auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares
server.use(middlewares);

// Use body-parser for handling JSON requests
server.use(jsonServer.bodyParser);
server.post('/register', (req, res) => {
  const { username, password,email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const db = router.db; // Access the lowdb instance
  const userExists = db.get('users').find({ username }).value();
  const emailExists = db.get('users').find({ email }).value();

  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }
  if (emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  // Add new user to the database
  db.get('users')
    .push({ username,email, password }) // In production, never store plaintext passwords
    .write();

  //const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.status(201).json({ message: 'User created' });
});
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
