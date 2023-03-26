const express = require('express')
const { signUp, userLogin } = require("../controllers/userController")
const router = express.Router()

router.post('/login/', userLogin)

router.post('/signup/', signUp)

module.exports = router;