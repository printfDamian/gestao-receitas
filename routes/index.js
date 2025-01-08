const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");

const htmlTemplate = path.join(__dirname, "..", "views/templates/htmlTemplate.ejs");

// Home page route
router.get("/", async (req, res) => {
    res.render(htmlTemplate, {
        docTitle: "GR - Home",
        upperNavBar: true,
        footer: true,
        content: await renderFile(path.join(__dirname, "..", "views/index.ejs"), {
            recipes: ["Bolo de cenoura", "Bolo de chocolate", "Bolo de laranja"]
        })
    });
});

module.exports = router;
