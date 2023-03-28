const express = require('express')
const { signUp, userLogin, verifyToken, postFun } = require("../controllers/userController")
const router = express.Router()

router.post('/login/',  userLogin)

router.post('/post/', verifyToken, postFun)

router.post('/signup/', signUp)

module.exports = router;