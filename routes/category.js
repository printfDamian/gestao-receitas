const express = require("express");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const verifyToken = require("./verifyToken"); // later on if you want to favorite a recipe 
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
    if(user){
        res.render("category", {
            categories: categories,
            user: user
        });
    }else{
        res.render("category", {
        categories: categories,
    });
    }
    
});
module.exports = router;