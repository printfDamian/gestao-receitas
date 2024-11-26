const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
const ejs = require('ejs')
const path = require("path");


router.get("/dashboard", verifyToken, (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    const user = req.session.user; 
    res.render("dashboard", {
        docTitle: "GR - Dashboard",
        user: user 
    });
});


module.exports = router;
