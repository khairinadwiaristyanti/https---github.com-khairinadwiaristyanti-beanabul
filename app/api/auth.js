const express = require("express")
const router = express.Router()
const { login, register, user } = require("../controller/auth")
const { authorize } = require("../middleware/auth")

router
    .post("/login", login)
    .post("/register", register)
    .get("/user", authorize, user)

module.exports = router