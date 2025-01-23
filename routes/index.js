const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getRandomMeals } = require("../controllers/mealController");

const htmlTemplate = path.join(__dirname, "..", "views/templates/htmlTemplate.ejs");

// Home page route
router.get("/", async (req, res, next) => {
    try {
        const recipes = await getRandomMeals(10);
        const content = await renderFile(path.join(__dirname, "..", "views/index.ejs"), { recipes });
        return res.render(htmlTemplate, {
            docTitle: "GR - Home",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFile: "index.css",
            CustomJsFile: null
        });
    } catch (error) {
        next(error); 
    }
});

module.exports = router;