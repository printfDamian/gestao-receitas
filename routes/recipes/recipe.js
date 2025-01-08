var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const userController = require('../../controllers/userController'); 

const pathToTemplate = path.join(__dirname, "/../views/htmlTemplate.ejs");

router.get('/registerPage', (req, res) => {
    const error = req.query.error;
    fs.readFile(__dirname + "/../views/register.ejs", "utf8", (err, data) => {
        if (err) return res.status(500).send(err.message);
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Register",
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

router.post('/register', userController.register);

module.exports = router;