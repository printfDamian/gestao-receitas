var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

router.get('*', (req, res) => {
    fs.readFile(__dirname + "/../public/views/erro.html", "utf8", (err, data) => {
        if (err) res.status(500).send(err.message);
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Register",
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
module.exports = router;
