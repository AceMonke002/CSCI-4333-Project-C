const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./database/insurance.db');

// Get all policies
router.get('/', (req, res) => {
    db.all('SELECT * FROM Policy', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get a single policy by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Policy WHERE policyId = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Policy not found' });
        res.json(row);
    });
});

// Add a new policy
router.post('/', (req, res) => {
    const { policyName, policyType, coverageAmount, premium, description } = req.body;
    db.run(
        `INSERT INTO Policy (policyName, policyType, coverageAmount, premium, description) 
         VALUES (?, ?, ?, ?, ?)`,
        [policyName, policyType, coverageAmount, premium, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ policyId: this.lastID });
        }
    );
});

// Update a policy
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { policyName, policyType, coverageAmount, premium, description } = req.body;
    db.run(
        `UPDATE Policy SET policyName = ?, policyType = ?, coverageAmount = ?, premium = ?, description = ?
         WHERE policyId = ?`,
        [policyName, policyType, coverageAmount, premium, description, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Policy not found' });
            res.json({ success: true });
        }
    );
});

// Delete a policy
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Policy WHERE policyId = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Policy not found' });
        res.json({ success: true });
    });
});

module.exports = router;