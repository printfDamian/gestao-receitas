var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const userController = require('../../controllers/userController'); 

const pathToTemplate = path.join(__dirname, "/../views/htmlTemplate.ejs");

router.get('/loginPage', (req, res) => {
    const error = req.query.error;
    fs.readFile(__dirname + "/../views/login.ejs", "utf8", (err, data) => {
        if (err) return res.status(500).send(err.message);
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Login",
            upperNavBar: true,
            content: data,
            footer: true,
            error: error
        },
        (err, str) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(str);
            }
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/loginPage');
    });
});

router.post('/login', userController.login);

module.exports = router;