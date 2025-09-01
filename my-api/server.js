require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const user = { id: results[0].id, username: results[0].username };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.get('/realisations', (req, res) => {
  const sql = 'SELECT * FROM realisations';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.post('/realisations', verifyToken, (req, res) => {
  const data = req.body;
  const sql = 'INSERT INTO realisations SET ?';
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, ...data });
  });
});

app.put('/realisations/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = 'UPDATE realisations SET ? WHERE id = ?';
  db.query(sql, [data, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ id, ...data });
  });
});

app.delete('/realisations/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM realisations WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(204).end();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
