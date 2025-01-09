const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pathToTemplate = path.join(__dirname, "views/templates/htmlTemplate.ejs");

router.use(require('./index'));
router.use(require('./auth/register'));
router.use(require('./auth/login'));
router.use(require('./dashboard'));
router.use(require('./recipes/recipe'));
router.use(require('./recipes/category'));

router.get('*', (req, res) => {
    fs.readFile(__dirname + "../views/erro.ejs", "utf8", (err, data) => {
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
