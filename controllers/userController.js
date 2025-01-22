const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const validate = require('../configs/validations');
const { error } = require('jquery');
const JWT_SECRET = process.env.SECRETKEY;

function validateCredentials(name, email, password) {
    if (name) {
        if (!name || !email || !password) {
            return 'All fields are required';
        }
    } else {
        if (!email || !password) {
            return 'All fields are required';
        }
    }

    if (!validate.email(email)) {
        return validate.emailRegex().description;
    }

    if (!validate.password(password)) {
        return validate.passwordRegex().description;
    }

    return null;
}

const register = async (req, res) => {
    try {
        let { name, email, password, remember } = req.body;

        name = name.trim();
        email = email.trim();
        password = password.trim();
        
        const error = validateCredentials(name, email, password)
        if (error) return res.status(400).json({ error: error });
    
        const user = await getUserByEmail(email);
        if (user) return res.status(400).json({ error: 'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await createUser({
            email,
            password: hashedPassword,
            name
        });

        let expires = '24h';
        if(remember === true) {
            expires = '1y';
        }

        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: expires }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            userId: newUser.id
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        let { email, password, remember } = req.body;

        email = email.trim();
        password = password.trim();

        const error = validateCredentials(email, password)
        if (error) return res.status(400).json({ error: error });

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        let expires = '24h';
        if(remember === true) {
            expires = '1y';
        }

        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: expires }
        );
        res.cookie('loginToken', jwtToken, {signed: true});

        res.send({ message: 'Logged in successfully', token: jwtToken });
    } catch (err) {
        res.send({ error: 'Login failed' });
        console.log(err);
    }
};

module.exports = { register, login };
