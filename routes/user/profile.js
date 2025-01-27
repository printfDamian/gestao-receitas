const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router(); 
const path = require("path");
const { verifyToken } = require("../auth/verifyToken");
const { getUserById } = require("../../controllers/userController");
const { getUserCollections } = require("../../models/collectionModel");
const { getFavoriteByUserId } = require("../../models/favoriteModel");
const { getMealById } = require("../../controllers/mealController");
const {updateUser} = require("../../controllers/userController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await getUserById(userId);
        const collections = await getUserCollections(userId);
        const favorites = await getFavoriteByUserId(userId);

        // Fetch recipe names for favorites
        const favoriteRecipes = await Promise.all(favorites.map(async (favorite) => {
            const recipe = await getMealById(favorite.recipe_id);
            return {
                ...favorite,
                recipeName: recipe.strMeal
            };
        }));

        const content = await renderFile(path.join(__dirname, "../..", "views/user/userProfile.ejs"), {
            user,
            collections,
            favorites: favoriteRecipes
        });
        
        return res.render(htmlTemplate, {
            docTitle: "GR - User Profile",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: null,
            CustomJsFiles: ["userProfile.js"],
        });
    } catch (error) {
        next(error);
    }
});

router.post("/profile/update", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        const { name, email } = req.body;
        await updateUser(name, email, userId);
        res.json({ message: "Profile updated successfully" });
        const user = await getUserById(userId);
        console.log(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;