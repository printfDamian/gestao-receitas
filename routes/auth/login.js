const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { login } = require('../../controllers/userController'); 

const htmlTemplate = path.join(__dirname, "/../../views/templates/htmlTemplate.ejs");

router.get("/login", async (req, res, next) => {
    try {
        const content = await renderFile(path.join(__dirname + "/../../views/auth/login.ejs"));
        return res.render(htmlTemplate, {
            docTitle: "GR - Login",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFile: "auth/auth.css",
            CustomJsFile: "auth/login.js"
        });
    } catch (error) {
        next(error); 
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('loginToken');
    res.redirect('/login?alert=' + encodeURI("Logged out successfully") + '&type=success');
});

router.post('/login', login);

module.exports = router;