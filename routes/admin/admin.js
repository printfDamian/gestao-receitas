const express = require('express');
const router = express.Router();
const { renderFile } = require('ejs');
const path = require('path'); 
const adminController = require('../../controllers/adminController');
const { verifyToken } = require('../auth/verifyToken');
const { getUserById } = require('../../models/userModel');

const htmlTemplate = path.join(
  __dirname,
  "../..",
  "views/templates/htmlTemplate.ejs"
);

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await getUserById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        if (user.role !== 1) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        
        next();
    } catch (err) {
        console.error('Error in isAdmin middleware:', err);
        return res.status(500).json({ message: 'Internal server error checking admin status.' });
    }
};

// Dashboard route
router.get('/dashboard', verifyToken, isAdmin, async (req, res, next) => {
    console.log("teste dashboard12313123123123");
    try {
        const data = await adminController.getDashboard(req, res, next);
        console.log('aaaaaaaaaaaaaaaaaaaaaa'+JSON.stringify(data.favoriteRecipes));
        

        const content = await renderFile(
            path.join(__dirname, "../../views/admin/dashboard.ejs"), 
            { 
                totalUsers: data.totalUsers, 
                favoriteRecipes: JSON.stringify(data.favoriteRecipes),
                currentUser: data.currentUser
            }
        );
        console.log(data.favoriteRecipes);

        return res.render('templates/htmlTemplate', {
            docTitle: "GR - Admin Dashboard",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: ["admin/admin.css"],
            CustomJsFiles: []
        });
    } catch (err) {
        next(err);
    }
});

// User Management Routes
router.get('/users', verifyToken, isAdmin, async (req, res, next) => {
    try {
        const response = await adminController.getUsers();
        const content = await renderFile(
            path.join(__dirname, "../../views/admin/users.ejs"),
            { 
                users: response.users,
                token: req.userToken  // Pass the token to the view
            }
        );

        return res.render('templates/htmlTemplate', {
            docTitle: "GR - User Management",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: ["admin/admin.css"],
            CustomJsFiles: []
        });
    } catch (err) {
        console.error('Error in users route:', err);
        next(err);
    }
});

// API Routes for User Management
router.post('/users', verifyToken, isAdmin, adminController.addUser);
router.put('/users/:id', verifyToken, isAdmin, adminController.modifyUser);
router.delete('/users/:id', verifyToken, isAdmin, adminController.removeUser);

module.exports = router;