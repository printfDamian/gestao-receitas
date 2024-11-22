const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
//const path = require("path");
router.get("/dashboard", verifyToken, (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    const user = req.session.user; 
    res.render("dashboard", {
        user: user 
    });
});
module.exports = router;
