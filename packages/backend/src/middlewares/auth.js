const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } catch (error) {
        req.user = null;
    }

    next();
};

module.exports = authenticate;
