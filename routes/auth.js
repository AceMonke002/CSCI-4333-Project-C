const express = require('express');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ userId: user.userId, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    });
});

module.exports = router;