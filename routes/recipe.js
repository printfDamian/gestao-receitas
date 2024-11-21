const express = require("express");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const verifyToken = require("./verifyToken");
const router = express.Router();

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Disable SSL verification for axios
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

router.get("/recipes", verifyToken,async (req, res) => {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", { httpsAgent: agent });
        const meals = response.data.meals;
        const user = req.session.user;
        res.render("recipe", {
            meals: meals,
            user: user
        });
        console.log(meals);
});
module.exports = router;