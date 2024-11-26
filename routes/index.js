const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { User } = require('../models/User');
const verifyToken = require("./verifyToken");

const router = express.Router();

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Home page route
router.get("/", (req, res) => {
    const user = req.session.user;
    res.render("indexLoggedIn", {
        user: user,
        docTitle: "GR - Home"
    }); 
});


module.exports = router;