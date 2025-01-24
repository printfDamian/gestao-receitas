const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getMealsById } = require("../../controllers/mealController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");





router.get("/recipeDetails", async (req, res, next) => {
    try {
        const mealId = req.query.id;
        
        const recipe = await getMealsById(mealId);
        console.log(recipe);
        const content = await renderFile(path.join(__dirname, "../..", "views/recipes/recipeDetails.ejs"), {recipe});

        return res.render(htmlTemplate, {
            docTitle: "GR - Recipe Details",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFile: null,
            CustomJsFile: null,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;