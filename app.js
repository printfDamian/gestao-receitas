const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
require("dotenv").config();
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

let contador = [];
// App Config
const port = process.env.PORT || 8800;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./public")));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronize models
if (process.argv.includes("--sync")) {
	sequelizeInstance.sync({ force: true }).then(() => {
		console.log("Models synced");
	});
}

// Routes / Endpoints
const index = require("./routes/index");
app.use(index);

const register = require("./routes/register");
app.use(register);

const login = require("./routes/login");
app.use(login);

const routes = require("./routes/routes");
app.use(routes);

app.listen(port);
console.log("Server running on http://localhost:" + port);
