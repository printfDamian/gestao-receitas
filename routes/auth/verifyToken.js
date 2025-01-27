const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies?.loginToken;
    let loginUrl = "/login?destination=" + req.originalUrl;

    if (!token) {
        return res.status(401).redirect(loginUrl + "&alert=" + encodeURI("Access denied") + "&type=danger");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        return res.status(401).redirect(loginUrl + "&alert=" + encodeURI("Access denied") + "&type=danger");
    }
};

const hasToken = () => {
    return (req, res, next) => {
        const token = req.cookies?.loginToken;
        req.userRole = null;
        if (!token) {
            req.userToken = null;
            res.locals.token = null;
            res.locals.role = null;
            return next();
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            req.userRole = decoded.role;
            req.userToken = decoded.userId;
            res.locals.token = decoded.userId;
            res.locals.role = decoded.role;
            console.log('User ', req.userId, ' has a token');
            console.log('Token Middleware - After decode role:', req.userRole);
            next();
        } catch (err) {
            console.error('JWT Verification Error:', err);
            req.userToken = null;
            res.locals.token = null;
            res.locals.role = null;
            next();
        }
    };
};

module.exports = { verifyToken, hasToken };