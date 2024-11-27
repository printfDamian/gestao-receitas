const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const verifyToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.redirect('/loginPage');
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/loginPage');
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;