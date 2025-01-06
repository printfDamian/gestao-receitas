const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? 'gestao_receitas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(config);

module.exports = pool;
