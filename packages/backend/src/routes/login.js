// packages/backend/src/routes/login.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            const message = info ? info.message : err ? err.message : 'Unknown error';
            logger.error(`Login failed: ${message}`);
            return res.status(400).json({ message, user });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                logger.error(`Login error: ${err}`);
                return res.send(err);
            }
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role }, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            logger.info(`User logged in: ${user.email}, Token generated: ${token}`);
            return res.json({ user, token });
        });
    })(req, res);
});

module.exports = router;
