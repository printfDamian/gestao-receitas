const pool = require("../configs/localDataBase");

const getAllUsers = async () => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users', (err, rows, fields) => {
		if (err) throw err;
		return rows;
	});
}

const getUserById = async (id) => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users WHERE id = ?', [id], (err, rows, fields) => {
		if (err) throw err;
		return rows[0];
	});
}

const getUserByEmail = async (email) => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users WHERE email = ?', [email], (err, rows, fields) => {
		if (err) throw err;
		return rows[0];
	});
}

const createUser = async (name, email, password) => {
	await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, rows, fields) => {
		if (err) throw err;
		return rows;
	});
}

const updateUser = async (name, email, password, id) => {
	await pool.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err, rows, fields) => {
		if (err) throw err;
		return rows;
	});
}

const deleteUser = async (id) => {
	await pool.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
		if (err) throw err;
		return rows;
	});
}

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser };
