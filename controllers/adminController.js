const userModel = require('../models/userModel');

const getDashboard = async (req, res) => {
    try {
        const totalUsers = await userModel.getTotalUsers();
        const favoriteCategories = await userModel.getFavoriteCategories();
        res.render('admin/dashboard', { totalUsers, favoriteCategories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getDashboard };