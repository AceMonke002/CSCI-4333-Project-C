const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./database/insurance.db');

// Get all customers
router.get('/', (req, res) => {
    db.all('SELECT * FROM Customer', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add a new customer
router.post('/', (req, res) => {
    const { firstName, lastName, dob, email, phone, address } = req.body;
    db.run(
        `INSERT INTO Customer (firstName, lastName, dob, email, phone, address)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dob, email, phone, address],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ customerId: this.lastID });
        }
    );
});

module.exports = router;