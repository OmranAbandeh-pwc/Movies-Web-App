const express = require('express')
const { signUp, userLogin } = require("../controllers/userController")
const { verifyToken } = require('../Global')
const router = express.Router()

router.post('/login/',  userLogin)

router.post('/post/', verifyToken)

router.post('/signup/', signUp)

module.exports = router;