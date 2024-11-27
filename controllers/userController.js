const { auth } = require('../firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const user = await User.create({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: req.body.name
        });

        const token = await firebaseUser.getIdToken();

        // Generate JWT
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Store JWT and user data in session
        req.session.token = jwtToken;
        req.session.user = user;

        res.redirect('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
        res.redirect('/registerPage?error=' + encodeURIComponent(err.message));
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        let user = await User.findOne({ where: { id: firebaseUser.uid } });
        if (!user) {
            user = await User.create({
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || ''
            });
        }

        const token = await firebaseUser.getIdToken();

        // Generate JWT
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Store JWT and user data in session
        req.session.token = jwtToken;
        req.session.user = user;

        res.redirect('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
        res.redirect('/loginPage?error=' + encodeURIComponent(err.message));
    }
};