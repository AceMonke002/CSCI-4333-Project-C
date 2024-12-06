const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./database/insurance.db');

// Get all agents
router.get('/', (req, res) => {
    db.all('SELECT * FROM Agent', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get a single agent by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Agent WHERE agentId = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Agent not found' });
        res.json(row);
    });
});

// Add a new agent
router.post('/', (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    db.run(
        `INSERT INTO Agent (firstName, lastName, email, phone) VALUES (?, ?, ?, ?)`,
        [firstName, lastName, email, phone],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ agentId: this.lastID });
        }
    );
});

// Update an agent
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    db.run(
        `UPDATE Agent SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE agentId = ?`,
        [firstName, lastName, email, phone, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Agent not found' });
            res.json({ success: true });
        }
    );
});

// Delete an agent
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Agent WHERE agentId = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Agent not found' });
        res.json({ success: true });
    });
});

module.exports = router;