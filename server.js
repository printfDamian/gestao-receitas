var express = require("express");
var path = require("path");
var app = express();
var port = 5052;
var rotas = require('./public/routes/rotas-forms');
let contador = [];
const fs = require('fs');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





console.log("Server running on http://localhost:" + port);
app.listen(port);