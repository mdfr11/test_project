const express = require('express')
const router = express.Router()

const authRouter = require("./auth")
const userRouter = require("./user")
const fileRouter = require("./file")

router.use('/', [authRouter, userRouter])
router.use('/file', fileRouter)

module.exports = router
