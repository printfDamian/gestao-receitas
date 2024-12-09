const express = require("express");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const verifyToken = require("./verifyToken"); // later on if you want to favorite a recipe 
const router = express.Router();

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Disable SSL verification for axios
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

router.get("/recipes",async (req, res) => {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", { httpsAgent: agent });
        const meals = response.data.meals;
        const user = req.session.user;
            res.render("recipe", {
                meals: meals,
                docTitle: "GR - Recipes",
                user: user
            });
        
        
});
router.get("/recipe/:id", async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + req.params.id, { httpsAgent: agent });
        const meal = response.data.meals[0];
        const user = req.session.user;
        res.render("recipeDetails", {
            meal: meal,
            docTitle: "GR - " + meal.strMeal,
            user: user
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;