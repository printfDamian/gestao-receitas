const pool = require("../configs/localDataBase");
const role = 2; // Default role for normal users

const getAllUsers = async () => {
	try {
		const [rows] = await pool.query('SELECT id, name, email, role, CREATED_AT, UPDATED_AT FROM users');
		return rows;
	} catch (err) {
		console.error('Error in getAllUsers:', err);
		throw err;
	}
}

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, role, CREATED_AT, UPDATED_AT FROM users WHERE id = ?', [id]);
    return rows[0] || null;
	try {
		const [rows] = await pool.query('SELECT id, name, email, role, CREATED_AT, UPDATED_AT FROM users WHERE id = ?', [id]);
		return rows[0] || null;
	} catch (err) {
		console.log(err);
		throw err;
	}
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
    const { name, email, password, role } = userData;
    try {
		// Insert the user
		const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, password, role || 2] // Default to regular user if role not specified
		);

		if (result.affectedRows !== 1) {
			throw new Error('Failed to create user');
		}

		// Get the created user
		const [rows] = await pool.query(
			'SELECT id, name, email, role, CREATED_AT, UPDATED_AT FROM users WHERE id = ?',
			[result.insertId]
        );

        return rows[0] || null;
    } catch (err) {
		console.error('Error creating user:', err);
		throw err;
	}
};

const updateUser = async (name, email, password, role, id) => {
    try {
        const [rows] = await pool.query(
            'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?', 
            [name, email, password, role, id]
        );
        return rows;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};

const updateUserWithoutPassword = async (name, email, role, id) => {
    try {
        let rows;
        
        if(role) {
            [rows] = await pool.query(
                'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', 
                [name, email, role, id]
            );
        } else {
            [rows] = await pool.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?', 
                [name, email, id]
            );
        }
        
        return rows;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};

const deleteUser = async (id) => {
    try {
        const [rows] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

const getTotalUsers = async () => {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM users');
    return rows[0].total;
};

const updateAdminPassword = async () => {
    try {
        const [result] = await pool.query(
            'UPDATE users SET password = ? WHERE role = 1',
            ['Admin123']
        );
        return result;
    } catch (err) {
        console.error('Error updating admin password:', err);
        throw err;
    }
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, updateUserWithoutPassword, deleteUser, getTotalUsers, updateAdminPassword };
