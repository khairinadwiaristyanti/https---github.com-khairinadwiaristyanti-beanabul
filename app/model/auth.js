const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SALT = 10;
const User = require('../model/user')
const ApplicationError = require('../../config/errors/ApplicationError')


const encryptedPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, SALT)
        return hash
    } catch (err) {
        throw new Error(err)
    }
}

const checkPassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash)
        return result
    } catch (err) {
        throw new Error(err)
    }
}

const JWT_SECRET_KEYY = "LOOMLY"
const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEYY)
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEYY);
        console.log("decoded :", decoded);
        return decoded; // Token valid, kembalikan payload yang terdekripsi
    } catch (err) {
        // Token tidak valid, tangani kesalahan di sini
        console.error('Token tidak valid:', err.message);
        return null; // Atau Anda bisa melemparkan pengecualian baru di sini jika diperlukan
    }
};
const authorize = async (bearerToken) => {
    try {
        if (!bearerToken) {
            throw new ApplicationError('Unauthorized', 401)
        }
        
        const token = bearerToken.replace("Bearer ", "");

        const decoded = verifyToken(token)
        const { id } = decoded
        const user = await User.getUserById(id);

        if (!user) {
            throw new ApplicationError('User Not Found', 404)
        }

        return user;
    } catch (err) {
        throw new ApplicationError(err.message, err.statusCode || 500)
    }
}

const login = async (email, password) => {
    try {
        const user = await User.getUserByEmail(email);
        console.log("user :", user);
        if (!user) {
            throw new ApplicationError('User not found', 404)
        }

        const isPasswordMatch = await checkPassword(password, user.password)
        console.log("isPasswordMatch :", isPasswordMatch);
        if (!isPasswordMatch) {
            throw new ApplicationError('Password not match', 401)
        }

        const token = createToken({ id: user.id })
        console.log("token :", token);
        return {
            user,
            token
        }
    } catch (err) {
        throw new ApplicationError(err.message, err.statusCode || 500)
    }
}

module.exports = {
    encryptedPassword,
    checkPassword,
    authorize,
    createToken,
    verifyToken,
    login
}