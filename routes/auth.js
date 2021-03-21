const express = require('express');
const { User } = require('../db/models');
const { comparePassword } = require('../utils/passwordEncryption');
const tokenUtils = require("../utils/jwt");
const { authMiddleware } = require('../middlewares/index');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
  const { id, password } = req.body;
  const foundUser = await User.findByPk(id)
  if (foundUser) {
    let err = new Error(`User already exists`);
    err.statusCode = 409;
    return next(err);
  }

  const tokens = {
    accessToken: tokenUtils.generateAccessToken({ id }),
    refreshToken: tokenUtils.generateRefreshToken({ id })
  }

  await User.create({ id, password, refreshToken: tokens.refreshToken })
  res.send(tokens)
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

  res.send({
    accessToken: tokenUtils.generateAccessToken({ id })
  })
})

authRouter.post('/signin/new_token', async (req, res, next) => {
  const { refreshToken } = req.body;
  let userId

  try {
    const verifiedToken = tokenUtils.verify(refreshToken);
    userId = verifiedToken.data.id;
  } catch (error) {
    let err = new Error(error.message);
    err.statusCode = 400;
    return next(err);
  }

  res.send({
    accessToken: tokenUtils.generateAccessToken({ id: userId })
  })
})

authRouter.get('/logout', authMiddleware, async (req, res, next) => {
  const { id } = req.user
  const foundUser = await User.findByPk(id)
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    return next(err);
  }

  const refreshToken = tokenUtils.generateRefreshToken({ id })
  
  foundUser.refreshToken = refreshToken
  foundUser.save()

  res.send({ refreshToken })
});

module.exports = authRouter;