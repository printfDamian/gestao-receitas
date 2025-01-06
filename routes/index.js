const express = require("express");
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
    const user = req.session.user;
    res.render("indexLoggedIn", {
        user: user,
        docTitle: "GR - Home"
    }); 
});


module.exports = router;    