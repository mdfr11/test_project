const express = require('express');
const { User } = require('../db/models');

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
  res.send({
    accessToken: "123",
    refreshToken: "123"
  })
});

module.exports = authRouter;