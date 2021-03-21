const express = require('express')
const router = express.Router()

const authRouter = require("./auth")
const userRouter = require("./user")

router.use('/', [authRouter, userRouter])

module.exports = router
