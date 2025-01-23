const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let loginUrl = "/login?destination=" + req.originalUrl;

    if (!token) {
        return res.status(401).redirect(loginUrl + "&alert=" + encodeURI("Access denied") + "&type=danger");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).redirect(loginUrl + "&alert=" + encodeURI("Access denied") + "&type=danger");
    }
};

const hasToken = () => {
    return (req, res, next) => {
        const token = req.cookies?.loginToken;
        
        if (!token) {
            req.userToken = null;
            return next();
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userToken = decoded.userId;
            console.log('User ', req.userToken, ' has a token');
            next();
        } catch (err) {
            console.error('JWT Verification Error:', err);
            req.userToken = null;
            next();
        }
    };
};

module.exports = { verifyToken, hasToken };