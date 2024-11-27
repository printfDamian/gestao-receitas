const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
require("dotenv").config();
const session = require('express-session');
const { Sequelize } = require("sequelize");
const sequelizeInstance = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        dialectModule: require("mysql2"),
    }
);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

// App Config
const port = process.env.PORT || 8800;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./public")));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Synchronize models
if (process.argv.includes("--sync")) {
    sequelizeInstance.sync({ force: true }).then(() => {
        console.log("Models synced");
    });
}

// Test database connection
sequelizeInstance.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Routes / Endpoints
const index = require('./routes/index');
app.use(index);

const register = require('./routes/register');
app.use(register);

const login = require('./routes/login');
app.use(login);

const dashboard = require('./routes/dashboard');
app.use(dashboard);

const recipe = require('./routes/recipe');
app.use(recipe);

const category = require('./routes/category');
app.use(category);

const routes = require('./routes/routes');
app.use(routes);

app.listen(port);
console.log("Server running on http://localhost:" + port);