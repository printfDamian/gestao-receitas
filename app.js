const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
require('dotenv').config();
let contador = [];

// App Config
const port = process.env.PORT || 8800;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./public")));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes / Endpoints
const index = require('./routes/index');
app.use(index);    

const routes = require('./routes/routes');
app.use(routes);

const register = require('./routes/register');
app.use(register);

const login = require('./routes/login');
app.use(login);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/views/erro.html"));
});

console.log("Server running on http://localhost:" + port);
app.listen(port);