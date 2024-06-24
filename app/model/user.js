const pool = require('../../db/db')
const ApplicationError = require('../../config/errors/ApplicationError')

const getUsers = async () => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query', 500);
    }
};

const getUserById = async (id) => {
    try{
        console.log(id);
        const query = `SELECT * FROM users WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get user by id :', 500);
    }
}

const getUserByEmail = async (email) => {
    try{
        const query = `SELECT * FROM users WHERE email='${email}'`;
        const [rows] = await pool.query(query);
        if (!rows) {
            throw new ApplicationError('Email not found', 404);
        }
        return rows[0];
    }
    catch (error) {
        throw new ApplicationError(`Error executing query get user by email : ${error}`, 500);
    }
}
const createUser = async ({username, email, password}) => {
    try {
        const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
        const [result] = await pool.query(query, [username, email, password]);
        if (result.affectedRows === 0) {
            throw new ApplicationError('User creation failed', 500);
        }

        // Fetch the newly created user by ID (result.insertId)
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        if (rows.length === 0) {
            throw new ApplicationError('User not found after creation', 500);
        }

        return rows[0]; // Return the created user
    } catch (error) {
        throw new ApplicationError(`Error creating user: ${error.message}`, 500);
    }
}

const updateUserUsername = async (userId, newUsername) => {
    try {
        const query = `UPDATE users SET username = ? WHERE id = ?`;
        const [result] = await pool.query(query, [newUsername, userId]);
        if (result.affectedRows === 0) {
            throw new ApplicationError('Failed to update username', 500);
        }
        return result;
    } catch (error) {
        throw new ApplicationError(`Error updating username: ${error.message}`, 500);
    }
}

const updateUserEmail = async (userId, newEmail) => {
    try {
        const query = `UPDATE users SET email = ? WHERE id = ?`;
        const [result] = await pool.query(query, [newEmail, userId]);
        if (result.affectedRows === 0) {
            throw new ApplicationError('Failed to update email', 500);
        }
        return result;
    } catch (error) {
        throw new ApplicationError(`Error updating email: ${error.message}`, 500);
    }
}

const updateUserPassword = async (userId, newPassword) => {
    try {
        const query = `UPDATE users SET password = ? WHERE id = ?`;
        const [result] = await pool.query(query, [newPassword, userId]);
        if (result.affectedRows === 0) {
            throw new ApplicationError('Failed to update password', 500);
        }
        return result;
    } catch (error) {
        throw new ApplicationError(`Error updating password: ${error.message}`, 500);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    getUserByEmail,
    updateUserUsername,
    updateUserEmail,
    updateUserPassword
}