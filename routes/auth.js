const express = require('express');
const { User } = require('../db/models');
const { comparePassword } = require('../utils/passwordEncryption');
const tokenUtils = require("../utils/jwt")

const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
  const { id, password } = req.body;
  const foundUser = await User.findByPk(id)
  if (foundUser) {
    let err = new Error(`User already exists`);
    err.statusCode = 409;
    return next(err);
  }

  await User.create({ id, password })
  res.send(tokenUtils.signin(id))
});

authRouter.post('/signin', async (req, res, next) => {
  const { id, password } = req.body;

  const foundUser = await User.findByPk(id);
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    return next(err);
  };

  const comparedPassword = comparePassword(password, foundUser.password);
  if (!comparedPassword) {
    let err = new Error(`Wrong password`);
    err.statusCode = 400;
    return next(err);
  };

  res.send(tokenUtils.signin(id))
})

module.exports = authRouter;