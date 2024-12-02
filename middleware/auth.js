const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function authenticate(role) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Access denied' });

        try {
            const payload = jwt.verify(token, SECRET_KEY);
            if (role && payload.role !== role) return res.status(403).json({ error: 'Forbidden' });
            req.user = payload;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
}

module.exports = { authenticate };