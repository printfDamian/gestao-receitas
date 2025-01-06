const { auth } = require('../configs/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const jwt = require('jsonwebtoken');
const { createUser, getUserById } = require('../models/userModel');

const JWT_SECRET = process.env.SECRETKEY;

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const user = await createUser(
            firebaseUser.uid,
            firebaseUser.email,
            req.body.name
        );

        // Generate JWT
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Store JWT and user data in session
        req.session.token = jwtToken;
        req.session.user = user;


        res.redirect('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
        res.redirect('/registerPage?error=' + encodeURIComponent(err.message));
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        let user = await getUserById(firebaseUser.uid);
        if (!user) {
            redirect('/loginPage?error=' + encodeURIComponent('User not found'));
        }

        // Generate JWT
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Store JWT and user data in session
        req.session.token = jwtToken;
        req.session.user = user;

        res.redirect('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
        res.redirect('/loginPage?error=' + encodeURIComponent(err.message));
        console.log(err);
    }
};

module.exports = { register, login };
