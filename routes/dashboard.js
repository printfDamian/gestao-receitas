const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
//const path = require("path");

router.get("/dashboard", verifyToken, (req, res) => {
    const user = req.session.user; 
    res.render("dashboard", {
        user: user 
    });
    console.log("User: ", user.id);
});



module.exports = router;