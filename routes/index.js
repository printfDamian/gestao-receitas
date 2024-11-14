const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { User } = require('../models/User');

const router = express.Router();

const pathToTemplate = path.join(__dirname, "../templates/htmlTemplate.html");

// Home page route
router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../public/views/index.html"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        
        ejs.renderFile(pathToTemplate, {
            docTitle: "GR - Home",
            upperNavBar: true,
            content: data,
            footer: true
        }, (err, str) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                res.status(200).send(str);
            }
        });
    });
});

// Test route to create and fetch a user
router.get("/test-user", async (req, res) => {
    try {
        // Create a test user
        const user = await User.create({
            id: 'test-id',
            email: 'test@example.com',
            name: 'Test User'
        });

        // Fetch the user
        const fetchedUser = await User.findByPk('test-id');
        res.json(fetchedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;