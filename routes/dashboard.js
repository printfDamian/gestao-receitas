const express = require("express");
const path = require("path");
const verifyToken = require("./verifyToken");

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
    const user = req.session.user; // Retrieve user data from session
    res.render("dashboard", {
        user: user // Pass user data to the template
    });
});

module.exports = router;