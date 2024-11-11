var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const userController = require('../controllers/userController'); 

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/erro.html"));
});
module.exports = router;