const Auth = require('../model/auth');
const User = require('../model/user');
const ApplicationError = require('../../config/errors/ApplicationError');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApplicationError('Please input your email and password', 400);
        }

        const user = await Auth.login(email, password);

        res.status(200).json({
            status: "SUCCESS LOGIN",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            status: "LOGIN FAIL",
            data: err.message,
        });
    }
}

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password) {
            throw new ApplicationError(`please input your password and email`, 500)
        }

        const encryptedPassword = await Auth.encryptedPassword(password)
        console.log(encryptedPassword);
        const user = await User.createUser({
            username,
            email,
            password: encryptedPassword,
        })
        console.log(user);

        res.status(201).json({
            status: "REGISTER SUCCESS",
            data: user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            status: "REGISTER FAIL",
            message: err.message,
        });
    }
}

exports.user = async (req, res) => {
    try{
        const bearerToken = req.headers.authorization;
        const user = await Auth.authorize(bearerToken)
        res.status(200).json({
            status: 'SUCCESS GET USER',
            data: user,
        });
    }catch (error){
        res.status(error.statusCode || 500).json({
            status: 'FAIL GET USER',
            message: error.message,
        });
    }
}