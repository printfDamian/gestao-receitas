var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pathToTemplate = path.join(__dirname, "views/htmlTemplate.ejs");




router.get('*', (req, res) => {
    fs.readFile(__dirname + "/views/erro.ejs", "utf8", (err, data) => {
        if (err) return res.status(500).send(err.message);
        
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
