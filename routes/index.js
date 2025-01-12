const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getRandomMeals } = require("../controllers/mealController");

const htmlTemplate = path.join(__dirname, "..", "views/templates/htmlTemplate.ejs");

// Home page route
router.get("/", async (req, res) => {
    try {
        const recipes = await getRandomMeals(10);
        const content = await renderFile(path.join(__dirname, "..", "views/index.ejs"), { recipes });
        res.render(htmlTemplate, {
            docTitle: "GR - Home",
            upperNavBar: true,
            footer: true,
            content: content,
            CustomCssFile: "index.css"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;