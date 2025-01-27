const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { verifyToken } = require("../auth/verifyToken");
const { getUserById } = require("../../controllers/userController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const user = await getUserById(req.userId); // Use req.userId
        console.log("User information");
        console.log(user);
        const content = await renderFile(path.join(__dirname, "../..", "views/user/userProfile.ejs"), {
            user,
        });
        
        return res.render(htmlTemplate, {
            docTitle: "GR - User Profile",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: null,
            CustomJsFiles: null,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;