const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

let contador = [];

// App Config
const port = process.env.PORT || 8800;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./public")));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Synchronize models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

// Routes / Endpoints
const index = require('./routes/index');
app.use(index);    

const routes = require('./routes/routes');
app.use(routes);

const register = require('./routes/register');
app.use(register);

console.log("Server running on http://localhost:" + port);
app.listen(port);