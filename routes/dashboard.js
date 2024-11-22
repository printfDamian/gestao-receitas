const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
const ejs = require('ejs')
const path = require("path");
const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

//const path = require("path");
/*
router.get("/dashboard", verifyToken, (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    const user = req.session.user; 
    res.render("dashboard", {
        user: user 
    });
});
*/
router.get("/dashboard",verifyToken, (req, res) => {
    
        const user = req.session.user;
            ejs.renderFile(pathToTemplate, {
                docTitle: "GR - Dashboard",
                upperNavBar: true,
                user: user,
                content: ejs.renderFile(path.join(__dirname, "public\views\dashboard.ejs"), (err, str) => {
                    return str;
                }),
                footer: true
            }, (err, str) => {
                if (err) {
                    return res.status(500).send(err.message);
                } else {
                    res.status(200).send(str);
                }
            });  
        
        
    
});

module.exports = router;
