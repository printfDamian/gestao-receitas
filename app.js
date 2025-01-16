const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// === App Config ===

const port = process.env.PORT ?? 8800;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/css", express.static("./node_modules/bootstrap-icons/font"));
app.use("/css", express.static("./node_modules/swiper"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/js", express.static("./node_modules/swiper"));
app.use("/js", express.static("./node_modules/jquery/dist"));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests
app.use(morgan('dev'));

// Session/Cookie Configuration
app.use(cookieParser(process.env.SECRETKEY));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true
}));

// Routes & EndPoints
app.use(require('./routes/routes'));

app.listen(port);
console.log("Server running on http://localhost:" + port);
