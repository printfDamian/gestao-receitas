const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getAllMeals } = require("../../controllers/mealController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

// Explore recipes page route
router.get("/recipes", async (req, res, next) => {
    try {
        const recipes = await getAllMeals();
        const content = await renderFile(path.join(__dirname, "../..", "views/recipes/explorer.ejs"), { recipes });
        res.render(htmlTemplate, {
            docTitle: "GR - Home",
            upperNavBar: true,
            footer: true,
            content: content,
            CustomCssFile: "exporer.css"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;