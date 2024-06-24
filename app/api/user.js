const express = require("express")
const router = express.Router()
const { getUserById, getUsers, updateUserPassword, getUserByToken, updateUsername, updateUserEmail } = require("../controller/user")
const { authorize } = require("../middleware/auth")

// router
router
    .get("/", getUsers)
    .get("/userByToken", authorize, getUserByToken)
    .get("/:id", getUserById)
    .put("/updatePassword", authorize, updateUserPassword)
    .put("/updateUsername", authorize, updateUsername)
    .put("/updateEmail", authorize, updateUserEmail)
// router.get("/user",authorize, getUser)

module.exports = router