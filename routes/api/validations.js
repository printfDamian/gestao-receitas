const express = require("express");
const router = express.Router();
const { emailRegex, passwordRegex } = require("../../configs/validations");

router.get("/api/validations", async (req, res, next) => {
    try {
        res.json({
            email: emailRegex(),
            password: passwordRegex()
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;