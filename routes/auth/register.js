const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { register } = require('../../controllers/userController'); 

const htmlTemplate = path.join(__dirname, "/../../views/templates/htmlTemplate.ejs");

router.get("/register", async (req, res, next) => {
    try {
        const content = await renderFile(path.join(__dirname + "/../../views/auth/register.ejs"));
        res.render(htmlTemplate, {
            docTitle: "GR - Register",
            upperNavBar: true,
            footer: true,
            content: content,
            CustomCssFile: "register.css"
        });
    } catch (error) {
        next(error); 
    }
});

router.post('/register', register);

module.exports = router;