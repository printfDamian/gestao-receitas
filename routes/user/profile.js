const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router(); 
const path = require("path");
const { verifyToken } = require("../auth/verifyToken");
const { getUserById, updateUser } = require("../../controllers/userController");

const htmlTemplate = path.join(__dirname, "../..", "views/templates/htmlTemplate.ejs");

router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await getUserById(userId);
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
            CustomJsFiles: ["userProfile.js"], // Include the new JS file
        });
    } catch (error) {
        next(error);
    }
});

router.post("/profile/update", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        const { name, email } = req.body;
        await updateUser(name, email, userId);
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;