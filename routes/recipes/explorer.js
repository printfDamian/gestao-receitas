const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getAllMeals } = require("../../controllers/mealController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

// Explore recipes page route
router.get("/explorer", async (req, res, next) => {
    try {
        const recipes = await getAllMeals();
        const content = await renderFile(path.join(__dirname, "../..", "views/recipes/explorer.ejs"), { recipes });

        return res.render(htmlTemplate, {
            docTitle: "GR - Explorer",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFile: "recipes/explorer.css",
            CustomJsFile: null
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;