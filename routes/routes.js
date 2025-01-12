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
router.use(require('./recipes/explorer'));
router.use(require('./recipes/category'));

// Error handling
router.all("*", (req, res, next) => {
    const error = new Error("Page not found");
    error.statusCode = 404;
    next(error);
});

router.use(async (err, req, res, next) => {
    console.error('Error:', err.message);
    
    try {
        const errorPage = await ejs.renderFile(path.join(__dirname, "/../views/erro.ejs"));
        
        res.status(err.statusCode || 500).render(pathToTemplate, {
            docTitle: "GR - Error",
            upperNavBar: true,
            content: errorPage,
            footer: true,
            CustomCssFile: null
        });
    } catch (renderError) {
        console.error('Error rendering error page:', renderError);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
