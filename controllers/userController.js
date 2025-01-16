const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const validate = require('../configs/validations');
const JWT_SECRET = process.env.SECRETKEY;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validate.email(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!validate.password(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one letter and one number' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await createUser({
            email,
            password: hashedPassword,
            name
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            userId: user.id
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.cookie('loginToken', jwtToken, {signed: true});

        res.send({ message: 'Logged in successfully', token: jwtToken });
    } catch (err) {
        res.send({ error: 'Login failed' });
        console.log(err);
    }
};

module.exports = { register, login };
