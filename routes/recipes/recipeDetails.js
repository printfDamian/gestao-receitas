const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getMealById } = require("../../controllers/mealController");
const { calculateTime, calculateDifficulty, calculateCost } = require("../../utils/recipeCalculations");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

router.get("/recipeDetails", async (req, res, next) => {
    try {
        const mealId = req.query.id;

        if (!mealId) {
            return res.redirect("/");
        }

        const recipe = await getMealById(mealId);
        const content = await renderFile(path.join(__dirname, "../..", "views/recipes/recipeDetails.ejs"), {
            recipe,
            calculateTime,
            calculateDifficulty,
            calculateCost
        });

        return res.render(htmlTemplate, {
            docTitle: "GR - Recipe Details",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: ["recipes/recipeDetails.css"],
            CustomJsFiles: ["recipes/recipeDetails.js"],
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;