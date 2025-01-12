const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pathToTemplate = path.join(__dirname, "/../views/templates/htmlTemplate.ejs");

router.use(require('./index'));
router.use(require('./auth/register'));
router.use(require('./auth/login'));
router.use(require('./dashboard'));
router.use(require('./recipes/recipe'));
router.use(require('./recipes/category'));

// Error handling
router.all("*", (req, res, next) => {
    const error = new Error("Page not found");
    error.statusCode = 404;
    next(error);
});

router.use(async (err, req, res, next) => {
    console.log(err.message);
    if (res.headersSent) return next(err);
    
    const errorPage = await ejs.renderFile(path.join(__dirname + "/../views/erro.ejs"));
    ejs.renderFile(pathToTemplate, {
        docTitle: "GR - Register",
        upperNavBar: true,
        content: errorPage,
        footer: true,
        CustomCssFile: null
    },
    (err, str) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(str);
        }
    });
});

module.exports = router;
