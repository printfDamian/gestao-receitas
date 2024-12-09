const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
const ejs = require('ejs')
const path = require("path");


router.get("/dashboard", verifyToken, (req, res) => {
    const user = req.session.user; 
    res.render("dashboard", {
        docTitle: "GR - Dashboard",
        user: user 
        // idea for the future to do the active tab send a variabel in here
    });
});


module.exports = router;
