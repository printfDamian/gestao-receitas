const express = require("express");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const verifyToken = require("../auth/verifyToken"); // later on if you want to favorite a recipe 
const router = express.Router();

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Disable SSL verification so that the API link is acessed without trouble
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

router.get("/categories",async (req, res) => {
    const response = await axios.get("HTTP://www.themealdb.com/api/json/v1/1/categories.php", { httpsAgent: agent });
    const categories = response.data.categories;
    const user = req.session.user; 
    
        res.render("categories", {
            categories: categories,
            docTitle: "GR - Categories",
            user: user
        });
    
});

router.get("/category/:category", async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + req.params.category, { httpsAgent: agent });
        const meals = response.data.meals;
        const user = req.session.user;
        res.render("category", {
            meals: meals,
            docTitle: "GR - " + req.params.category,
            user: user
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;