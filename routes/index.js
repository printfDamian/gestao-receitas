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
    fs.readFile(path.join(__dirname, "../public/views/index.html"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        const user = req.session.user;
        if(user){
            res.render("indexLoggedIn", {
                user: user
            }); 
        }else{
            ejs.renderFile(pathToTemplate, {
                docTitle: "GR - Home",
                upperNavBar: true,
                upperNavBarLogin: false,
                content: ejs.renderFile(path.join(__dirname, "public\views\indexLoggedIn.ejs"), (err, str) => {
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
        }
        
    });
});


module.exports = router;