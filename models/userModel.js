const pool = require("../configs/localDataBase");
const role = 2; // Default role for normal users

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT id, name, email, CREATED_AT, UPDATED_AT FROM users');
    return rows;
}

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, CREATED_AT, UPDATED_AT FROM users WHERE id = ?', [id]);
    return rows[0] || null;
}

const getUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, password, role, CREATED_AT, UPDATED_AT FROM users WHERE email = ?', [email]);
        return rows[0] || null;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const createUser = async (userData) => {
    const { name, email, password } = userData;
    try {
        const [rows] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, password, role]
        );
        return rows || null;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateUserInDb = async (name, email, id) => {
    const [rows] = await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return rows;
}

const deleteUser = async (id) => {
    const [rows] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return rows;
}

const getTotalUsers = async () => {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM users');
    return rows[0].total;
};

const getFavoriteCategories = async () => {
    const [rows] = await pool.query('SELECT category, COUNT(*) AS count FROM user_favorites GROUP BY category ORDER BY count DESC');
    return rows.map(row => row.category).join(', ');
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUserInDb, deleteUser, getTotalUsers, getFavoriteCategories };