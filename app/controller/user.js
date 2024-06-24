const User = require('../model/user');
const Auth = require('../model/auth');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.status(200).json({
            status: 'SUCCESS',
            data: users,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: 'FAIL',
            message: error.message,
        });
    }
}

exports.getUserByToken = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.getUserById(userId);
        res.status(200).json({
            status: 'SUCCESS',
            data: user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: 'FAIL',
            message: error.message,
        });
    }

}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.getUserById(id);

        res.status(200).json({
            status: 'SUCCESS',
            user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: 'FAIL',
            message: error.message,
        });
    }
}

exports.updateUserEmail = async (req, res) => {
    const userId = req.user.id;
    console.log(req.body);
    const { oldEmail, newEmail } = req.body;

    try {
        const user = await User.getUserById(userId);
        if (!user || user[0].email !== oldEmail) {
            return res.status(400).json({ error: 'Old email does not match' });
        }

        const existingUser = await User.getUserByEmail(newEmail);
        if (existingUser) {
            return res.status(400).json({ error: 'New email is already in use' });
        }

        await User.updateUserEmail(userId, newEmail);
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUsername = async (req, res) => {
    const userId = req.user.id;
    const { oldUsername, newUsername } = req.body;

    try {
        const user = await User.getUserById(userId);
        console.log(user);
        if (user[0].username !== oldUsername) {
            console.log(user.username, oldUsername);
            return res.status(400).json({ error: 'Old username does not match' });
        }

        await User.updateUserUsername(userId, newUsername);
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUserPassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isPasswordMatch = await Auth.checkPassword(oldPassword, user[0].password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Old password does not match' });
        }

        const encryptedPassword = await Auth.encryptedPassword(newPassword);

        await User.updateUserPassword(userId, encryptedPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}