const { getAllUsers, getUserById, createUser, updateUser, updateUserWithoutPassword, deleteUser, getTotalUsers, getUserByEmail } = require('../models/userModel');
const { getFavoriteRecipes } = require('../models/favoriteModel');
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcryptjs');

const getDashboard = async (req, res, next) => {
    try {
        const [totalUsers, favoriteRecipes] = await Promise.all([
            getTotalUsers(),
            getFavoriteRecipes()
        ]);
        
        // Get current user info from the token
        const currentUser = {
            id: req.userId,
            email: req.userEmail,
            role: req.userRole
        };
        
        return {
            totalUsers,
            favoriteRecipes,
            currentUser
        };
    } catch (err) {
        console.error('Error in getDashboard:', err);
        throw err;
    }
};

const getUsers = async () => {
    try {
        const users = await getAllUsers();
        return { success: true, users };
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
};

const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email and password are required' 
            });
        }

        // Check if user with this email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'A user with this email already exists' 
            });
        }

        // Create the user
        await createUser({ 
            name, 
            email, 
            password, 
            role: role || 2 // Default to regular user if role not specified
        });

        return res.json({ 
            success: true, 
            message: 'User created successfully' 
        });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ 
            success: false, 
            message: 'Error creating user: ' + err.message 
        });
    }
};

const modifyUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userId = req.params.id;
        
        // If password is not provided, only update name, email and role
        if (!password || password.trim() === '') {
            await updateUserWithoutPassword(name, email, role, userId);
        } else {
            // Hash the password before updating
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await updateUser(name, email, hashedPassword, role, userId);
        }
        
        return res.json({ success: true, message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ success: false, message: 'Error updating user' });
    }
};

const removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await deleteUser(userId);
        return res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};

module.exports = {
    getDashboard,
    getUsers,
    addUser,
    modifyUser,
    removeUser
};