var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const userController = require('../controllers/userController'); 

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");



router.get('/loginPage', (req, res) => {
    fs.readFile(__dirname + "/../public/views/login.html", "utf8", (err, data) => {
        if (err) res.status(500).send(err.message);
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Login",
            upperNavBar: true,
            content: data,
            footer: true
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
router.post('/register', userController.login);

module.exports = router;