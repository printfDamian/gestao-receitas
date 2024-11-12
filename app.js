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
app.use('/', index);    

console.log("Server running on http://localhost:" + port);
app.listen(port);