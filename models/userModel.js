const pool = require("../configs/localDataBase");
const role = 2; // Default role for normal users

const getAllUsers = async () => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users', (err, rows, fields) => {
		if (err) throw err;
		return rows;
	});
}

const getUserById = async (id) => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users WHERE id = ?', [id], (err, rows, fields) => {
		if (err) throw err;
		return rows[0] || null;
	});
}

const getUserByEmail = async (email) => {
	await pool.query('SELECT id, name, email, CREATEAD_AT, UPDATED_AT FROM users WHERE email = ?', [email], (err, rows, fields) => {
		if (err) throw err;
		return rows[0] || null;
	});
}

const createUser = async (userData) => {
	const { name, email, password } = userData;
	return await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
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
