const { auth } = require('../firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { User } = require('../models/User');

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
        
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        res.json({ user, token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};