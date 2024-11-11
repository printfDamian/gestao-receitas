const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
let path = require("path");

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Home page route
router.get("/", (req, res) => {

    fs.readFile(__dirname + "/../public/views/index.html", "utf8", (err, data) => {
        if (err) res.status(500).send(err.message);
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Home",
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