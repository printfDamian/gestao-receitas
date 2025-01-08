const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const session = require('express-session');

// === App Config ===

const port = process.env.PORT ?? 8800;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./public")));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true
}));

// Routes / Endpoints
app.use(require('./routes/routes'));

app.listen(port);
console.log("Server running on http://localhost:" + port);
