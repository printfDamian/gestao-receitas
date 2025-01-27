const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pathToTemplate = path.join(__dirname, "/../views/templates/htmlTemplate.ejs");

router.use(require('./auth/verifyToken').hasToken());
router.use(require('./index'));
router.use(require('./auth/register'));
router.use(require('./auth/login'));
router.use(require('./recipes/explorer'));
router.use(require('./recipes/category'));
router.use(require('./recipes/recipeDetails'));
router.use(require('./admin/admin'));

router.use(require('./api/validations'));

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
            token: req.userToken,
            CustomCssFile: null,
            CustomJsFile: null
        });
    } catch (renderError) {
        console.error('Error rendering error page:', renderError);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
