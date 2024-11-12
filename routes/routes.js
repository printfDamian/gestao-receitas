var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const userController = require('../controllers/userController'); 

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/registerPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/register.html"));
});
router.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
});
router.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/views/erro.html"));
});

module.exports = router;
